import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CoccidiosisInfo = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Link to="/" className="absolute top-4 left-4">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      <Card className="w-full max-w-2xl shadow-xl animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            About Coccidiosis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            <strong>Coccidiosis</strong> is a parasitic disease of the intestinal tract of animals, caused by coccidian protozoa. The disease spreads from one animal to another by contact with infected feces or ingestion of infected tissue.
          </p>
          <h4 className="font-semibold text-foreground">Symptoms in Chickens:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Diarrhea, possibly bloody or watery.</li>
            <li>Weight loss and failure to absorb nutrients.</li>
            <li>Ruffled feathers and a pale comb or wattles.</li>
            <li>Listlessness and a general lack of energy.</li>
            <li>Reduced egg production in laying hens.</li>
          </ul>
          <p>
            Early detection through tools like this AI assistant is crucial for managing the health of your flock and preventing widespread outbreaks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoccidiosisInfo;