import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Target, Zap, PlayCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";

const Profile = () => {
  const { startOnboarding } = useOnboarding();
  
  const userData = {
    name: "Demo User",
    totalSaved: 45300,
    rank: 3,
    totalUsers: 20,
    badge: "💎 Smart Saver",
    level: 2,
    levelProgress: 75,
    streak: 3,
  };

  const leaderboard = [
    { name: "Meera", saved: 5300, rank: 1 },
    { name: "Amit", saved: 5100, rank: 2 },
    { name: "Demo User", saved: 4800, rank: 3 },
    { name: "Rahul", saved: 4500, rank: 4 },
    { name: "Priya", saved: 4200, rank: 5 },
  ];

  const goodies = [
    { icon: Zap, name: "Wallet Boost", description: "Save faster" },
    { icon: Target, name: "Goal Master", description: "Complete 10 goals" },
    { icon: TrendingUp, name: "Saver League", description: "Top 5 saver" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Profile Header */}
          <Card id="profile-info" className="shadow-xl bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="w-32 h-32 border-4 border-primary shadow-xl">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=demo" />
                    <AvatarFallback className="text-3xl font-bold">DU</AvatarFallback>
                  </Avatar>
                </motion.div>

                <div className="flex-1 text-center md:text-left space-y-3">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {userData.name}
                  </h1>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                    <div className="bg-accent/30 rounded-lg px-6 py-3 border border-primary/10">
                      <div className="text-sm text-muted-foreground">Total Saved</div>
                      <div className="text-3xl font-bold text-primary">
                        ₹{userData.totalSaved.toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-accent/30 rounded-lg px-6 py-3 border border-primary/10 flex items-center gap-2">
                      <Trophy className="w-8 h-8 text-yellow-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Current Rank</div>
                        <div className="text-2xl font-bold">
                          #{userData.rank} <span className="text-sm text-muted-foreground">/ {userData.totalUsers}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-primary to-primary/80">
                    {userData.badge}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Badge System */}
          <Card id="badges-section" className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-card to-accent/10">
            <CardHeader>
              <CardTitle className="text-2xl">🏅 AI Badge System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-6 border-2 border-primary/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold">Level {userData.level} Saver</h3>
                      <p className="text-sm text-muted-foreground">Consistent Goal Tracking {userData.streak} Days in a Row 🔥</p>
                    </div>
                    <div className="text-4xl">🌟</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Level {userData.level + 1}</span>
                      <span className="font-bold">{userData.levelProgress}%</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${userData.levelProgress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-accent/30 rounded-lg p-4 text-center border border-primary/10">
                    <div className="text-2xl mb-1">💰</div>
                    <div className="text-xs font-semibold">Total Saved</div>
                    <div className="text-sm text-primary font-bold">₹{userData.totalSaved.toLocaleString()}</div>
                  </div>
                  <div className="bg-accent/30 rounded-lg p-4 text-center border border-primary/10">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xs font-semibold">Streak</div>
                    <div className="text-sm text-primary font-bold">{userData.streak} Days</div>
                  </div>
                  <div className="bg-accent/30 rounded-lg p-4 text-center border border-primary/10">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-xs font-semibold">Rank</div>
                    <div className="text-sm text-primary font-bold">#{userData.rank}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="shadow-xl border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Top 5 Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user, index) => {
                  const isCurrentUser = user.name === "Demo User";
                  return (
                    <motion.div
                      key={user.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        isCurrentUser
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-accent/30 border border-primary/10"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1
                              ? "bg-yellow-500 text-white"
                              : user.rank === 2
                              ? "bg-gray-400 text-white"
                              : user.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">
                            {user.name}
                            {isCurrentUser && (
                              <span className="ml-2 text-sm text-primary">(You)</span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ₹{user.saved.toLocaleString()} saved
                          </div>
                        </div>
                      </div>
                      {user.rank <= 3 && (
                        <Badge variant={isCurrentUser ? "default" : "secondary"}>
                          Top {user.rank}
                        </Badge>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Goodies Section */}
          <Card className="shadow-xl border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">🎁 Goodies & Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goodies.map((goodie, index) => {
                  const Icon = goodie.icon;
                  return (
                    <motion.div
                      key={goodie.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-6 rounded-xl bg-gradient-to-br from-accent/40 to-primary/10 border-2 border-primary/20 hover:border-primary/50 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-4 rounded-full bg-primary/10">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{goodie.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {goodie.description}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Replay Tour Button */}
          <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="py-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <PlayCircle className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Need a Quick Tour?</h3>
                  <p className="text-muted-foreground mb-4">
                    Replay the guided walkthrough to rediscover Quantum's features
                  </p>
                </div>
                <Button 
                  onClick={startOnboarding} 
                  size="lg"
                  className="gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Replay Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer className="mt-16 py-8 border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-lg font-medium">
            Every rupee saved is a goal closer to your dream 💖
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
