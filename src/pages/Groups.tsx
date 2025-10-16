import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Plus, MapPin, Calendar, PartyPopper } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";

interface GroupMember {
  name: string;
  saved: number;
  target: number;
}

interface Group {
  id: string;
  name: string;
  eventType: string;
  totalBudget: number;
  members: GroupMember[];
  icon: any;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Trip to Goa",
      eventType: "Trip",
      totalBudget: 8000,
      icon: MapPin,
      members: [
        { name: "User A", saved: 1500, target: 2000 },
        { name: "User B", saved: 1900, target: 2000 },
        { name: "User C", saved: 1200, target: 2000 },
        { name: "User D", saved: 1700, target: 2000 },
      ],
    },
    {
      id: "2",
      name: "TechFest Fund",
      eventType: "Festival",
      totalBudget: 12000,
      icon: Calendar,
      members: [
        { name: "User A", saved: 2800, target: 3000 },
        { name: "User B", saved: 2950, target: 3000 },
        { name: "User C", saved: 2600, target: 3000 },
        { name: "User D", saved: 2900, target: 3000 },
      ],
    },
    {
      id: "3",
      name: "New Year Savings",
      eventType: "Plan",
      totalBudget: 16000,
      icon: PartyPopper,
      members: [
        { name: "User A", saved: 3500, target: 4000 },
        { name: "User B", saved: 3800, target: 4000 },
        { name: "User C", saved: 3200, target: 4000 },
        { name: "User D", saved: 3900, target: 4000 },
      ],
    },
  ]);

  const [newGroup, setNewGroup] = useState({
    name: "",
    eventType: "",
    totalBudget: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.eventType || !newGroup.totalBudget) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const budget = parseFloat(newGroup.totalBudget);
    const perPerson = budget / 4;

    const group: Group = {
      id: Date.now().toString(),
      name: newGroup.name,
      eventType: newGroup.eventType,
      totalBudget: budget,
      icon: Calendar,
      members: [
        { name: "User A", saved: 0, target: perPerson },
        { name: "User B", saved: 0, target: perPerson },
        { name: "User C", saved: 0, target: perPerson },
        { name: "User D", saved: 0, target: perPerson },
      ],
    };

    setGroups([...groups, group]);
    setNewGroup({ name: "", eventType: "", totalBudget: "" });
    setDialogOpen(false);
    toast({
      title: "Group created!",
      description: `${newGroup.name} has been created successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Savings Groups
              </h1>
              <p className="text-muted-foreground mt-2">
                Save together, achieve together 🎯
              </p>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  id="create-group-button"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Group Name</Label>
                    <Input
                      placeholder="e.g., Summer Trip"
                      value={newGroup.name}
                      onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Event Type</Label>
                    <Input
                      placeholder="e.g., Trip, Festival, Plan"
                      value={newGroup.eventType}
                      onChange={(e) => setNewGroup({ ...newGroup, eventType: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Budget (₹)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 10000"
                      value={newGroup.totalBudget}
                      onChange={(e) => setNewGroup({ ...newGroup, totalBudget: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleCreateGroup} className="w-full">
                    Create Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div id="group-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, index) => {
              const Icon = group.icon;
              const totalSaved = group.members.reduce((sum, m) => sum + m.saved, 0);
              const totalProgress = (totalSaved / group.totalBudget) * 100;

              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="shadow-xl bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-xl font-bold">{group.name}</div>
                          <div className="text-sm text-muted-foreground font-normal">
                            {group.eventType}
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-accent/30 rounded-lg p-4 border border-primary/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Total Budget</span>
                          <span className="text-xl font-bold text-primary">
                            ₹{group.totalBudget.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={totalProgress} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          ₹{totalSaved.toLocaleString()} saved ({totalProgress.toFixed(0)}%)
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Users className="w-4 h-4 text-primary" />
                          <span>Members Progress</span>
                        </div>
                        {group.members.map((member, idx) => {
                          const progress = (member.saved / member.target) * 100;
                          const getProgressColor = () => {
                            if (progress >= 95) return "bg-emerald-500";
                            if (progress >= 75) return "bg-green-500";
                            if (progress >= 50) return "bg-yellow-500";
                            if (progress >= 25) return "bg-orange-500";
                            return "bg-red-500";
                          };
                          
                          const progressBlocks = Array(5).fill(0).map((_, i) => i < Math.ceil(progress / 20));
                          
                          return (
                            <div key={idx} className="space-y-2 p-3 rounded-lg bg-accent/20 border border-primary/10 hover:border-primary/30 transition-all">
                              <div className="flex justify-between text-sm">
                                <span className="font-semibold">{member.name}</span>
                                <span className="text-muted-foreground font-medium">
                                  ₹{member.saved.toLocaleString()} / ₹{member.target.toLocaleString()}
                                </span>
                              </div>
                              
                              {/* Progress blocks */}
                              <div className="flex gap-1">
                                {progressBlocks.map((filled, blockIdx) => (
                                  <div
                                    key={blockIdx}
                                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                                      filled ? getProgressColor() : "bg-accent"
                                    }`}
                                  />
                                ))}
                              </div>
                              
                              {/* Progress bar */}
                              <div className="relative w-full bg-accent rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-500 ${getProgressColor()}`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              
                              <div className="text-xs text-muted-foreground text-right font-medium">
                                {progress.toFixed(0)}% complete
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
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

export default Groups;
