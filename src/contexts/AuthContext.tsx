import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured, Profile } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: "signin" | "signup";
  openAuthModal: (mode?: "signin" | "signup") => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = [
  (import.meta.env.VITE_ADMIN_EMAIL || "marquez.ronrons@gmail.com").toLowerCase(),
  "marquez.ronrons@gmail.com"
];

const checkIsAdminEmail = (email?: string | null) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");

  const openAuthModal = (mode: "signin" | "signup" = "signin") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Fetch or construct profile
  const fetchProfile = async (currentUser: User) => {
    const isUserAdmin = checkIsAdminEmail(currentUser.email);
    if (!isSupabaseConfigured) {
      const mockProfile: Profile = {
        id: currentUser.id,
        email: currentUser.email || "",
        full_name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split("@")[0] || "User",
        avatar_url: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture || "",
        role: isUserAdmin ? "admin" : "user",
        created_at: new Date().toISOString()
      };
      setProfile(mockProfile);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (data) {
        // If user is admin by email, ensure role is reflected
        const updatedProfile = {
          ...data,
          role: isUserAdmin ? "admin" : (data.role || "user")
        } as Profile;
        setProfile(updatedProfile);
      } else if (error) {
        // Create profile if missing
        const newProfile: Profile = {
          id: currentUser.id,
          email: currentUser.email || "",
          full_name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split("@")[0] || "User",
          avatar_url: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture || "",
          role: isUserAdmin ? "admin" : "user",
          created_at: new Date().toISOString()
        };
        await supabase.from("profiles").upsert(newProfile);
        setProfile(newProfile);
      }
    } catch (err) {
      console.warn("Profile fetch warning:", err);
    }
  };

  useEffect(() => {
    // Clean up OAuth hash fragment from URL if present
    if (window.location.hash.includes("access_token")) {
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 500);
    }

    if (!isSupabaseConfigured) {
      // Check local storage mock session if any
      const savedUser = localStorage.getItem("demo_auth_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          fetchProfile(parsed);
        } catch {
          // ignore
        }
      }
      setLoading(false);
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user);
      }
      setLoading(false);
    });

    // 2. Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      const mockGoogleUser = {
        id: "demo-google-user-" + Date.now(),
        email: "ronmrqz13@gmail.com",
        user_metadata: {
          full_name: "Ron Marquez",
          avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
        }
      } as unknown as User;
      setUser(mockGoogleUser);
      fetchProfile(mockGoogleUser);
      localStorage.setItem("demo_auth_user", JSON.stringify(mockGoogleUser));
      closeAuthModal();
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });
    return { error };
  };

  const signInWithEmail = async (email: string, password: string) => {
    const isUserAdmin = checkIsAdminEmail(email);
    if (!isSupabaseConfigured) {
      const mockUser = {
        id: isUserAdmin ? "admin-user" : "demo-user-" + Date.now(),
        email,
        user_metadata: {
          full_name: isUserAdmin ? "Ron Marquez" : email.split("@")[0],
          avatar_url: isUserAdmin ? "/icons/user.webp" : ""
        }
      } as unknown as User;
      setUser(mockUser);
      fetchProfile(mockUser);
      localStorage.setItem("demo_auth_user", JSON.stringify(mockUser));
      closeAuthModal();
      return { error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (!error && data.user) {
      closeAuthModal();
    }
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const isUserAdmin = checkIsAdminEmail(email);
    if (!isSupabaseConfigured) {
      const mockUser = {
        id: isUserAdmin ? "admin-user" : "demo-user-" + Date.now(),
        email,
        user_metadata: {
          full_name: fullName || email.split("@")[0],
          avatar_url: ""
        }
      } as unknown as User;
      setUser(mockUser);
      fetchProfile(mockUser);
      localStorage.setItem("demo_auth_user", JSON.stringify(mockUser));
      closeAuthModal();
      return { error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          name: fullName
        }
      }
    });
    if (!error && data.user) {
      closeAuthModal();
    }
    return { error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setProfile(null);
      localStorage.removeItem("demo_auth_user");
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const isAdmin = Boolean(
    profile?.role === "admin" ||
    checkIsAdminEmail(user?.email)
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        loading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
