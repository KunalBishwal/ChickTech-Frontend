import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, CheckCircle, XCircle, Loader, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// This defines the structure of the data we expect from the backend
interface AnalysisResult {
  class: 'Healthy' | 'Coccidiosis' | 'Error';
  score: number;
}

const DiagnosisTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null); // Reset previous result
      setError(null); // Reset previous error
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // THIS IS THE FUNCTION THAT CONNECTS TO YOUR PYTHON BACKEND
  const handleAnalyse = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]); // Remove the data URI prefix
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

    try {
      // The fetch call to your Flask API
      const response = await fetch('http://127.0.0.1:8080/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.length > 0) {
        setResult(data[0]);
      } else {
        throw new Error("Invalid response format from server.");
      }
      
    } catch (e) {
      console.error("Failed to fetch prediction:", e);
      setError("Analysis failed. Please try again.");
      setResult({ class: 'Error', score: 0 });
    } finally {
      setLoading(false);
    }
  };

  const getResultColor = () => {
    if (!result) return 'text-foreground';
    if (result.class === 'Healthy') return 'text-green-500';
    if (result.class === 'Coccidiosis') return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
       <Link to="/" className="absolute top-4 left-4">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      <Card className="w-full max-w-md shadow-2xl animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">AI Diagnosis Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="file-upload"
              className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50 transition-colors"
            >
              {preview ? (
                <img src={preview} alt="Image preview" className="object-cover h-full w-full rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, or JPEG</p>
                </div>
              )}
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" />
            </label>
          </div>

          <Button onClick={handleAnalyse} disabled={!file || loading} className="w-full text-lg py-6">
            {loading ? <Loader className="animate-spin mr-2" /> : null}
            {loading ? 'Analyzing...' : 'Start Diagnosis'}
          </Button>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          {result && result.class !== 'Error' && (
            <Card className="bg-muted/50 pt-6">
              <CardContent className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  {result.class === 'Healthy' && <CheckCircle className="w-8 h-8 text-green-500" />}
                  {result.class === 'Coccidiosis' && <XCircle className="w-8 h-8 text-red-500" />}
                  <h3 className={`text-3xl font-bold ${getResultColor()}`}>{result.class}</h3>
                </div>
                <div>
                  <p className="font-medium">Confidence Score</p>
                  <div className="flex items-center gap-2">
                    <Progress value={result.score * 100} className="w-full" />
                    <span className="font-semibold">{(result.score * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosisTool;