import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, Users, User } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Wallet },
    { path: "/groups", label: "Groups", icon: Users },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav id="navigation" className="border-b border-black/10 bg-white/60 backdrop-blur-xl sticky top-0 z-10 shadow-glass">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-tight"
        >
          Quantum
        </motion.h1>
        <div className="flex gap-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-6 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-brand-gradient text-white shadow-[0_0_20px_rgba(69,167,255,0.25)] scale-[1.02]"
                        : "bg-white/60 backdrop-blur border border-black/10 text-foreground hover:bg-white/80 hover:scale-[1.02]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-4 h-4 transition-transform hover:scale-[1.05] ${isActive ? 'hover-glow' : ''}`} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-brand-gradient rounded-full -z-10"
                          initial={false}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
