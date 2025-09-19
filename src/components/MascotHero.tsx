import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import mascotImage from "@/assets/chick-mascot.png";
import { Link } from "react-router-dom"; // Import the Link component

const MascotHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Mascot Image Section */}
        <div className="flex justify-center lg:justify-end order-2 lg:order-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl transform scale-110 animate-pulse-glow"></div>
            <img
              src={mascotImage}
              alt="ChickTech - Your friendly AI veterinary assistant"
              className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 object-contain animate-float drop-shadow-lg"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center lg:text-left order-1 lg:order-2 space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              AI-Powered Veterinary Technology
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Meet{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ChickTech
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl">
              Your adorable AI assistant for{" "}
              <span className="font-semibold text-foreground">
                chicken disease classification
              </span>. Making advanced veterinary technology friendly and accessible.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {/* THIS BUTTON NOW NAVIGATES TO THE DIAGNOSIS PAGE */}
            <Link to="/diagnose">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-8 py-6 rounded-2xl shadow-warm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Diagnosis
              </Button>
            </Link>

            <Link to="/learn-more">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-3 gap-4 pt-8">
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">🔬</span>
                </div>
                <h3 className="font-semibold text-sm">AI Analysis</h3>
                <p className="text-xs text-muted-foreground">Instant disease detection</p>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-accent font-bold">📱</span>
                </div>
                <h3 className="font-semibold text-sm">Easy to Use</h3>
                <p className="text-xs text-muted-foreground">Simple, friendly interface</p>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">⚡</span>
                </div>
                <h3 className="font-semibold text-sm">Fast Results</h3>
                <p className="text-xs text-muted-foreground">Get answers in seconds</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MascotHero;