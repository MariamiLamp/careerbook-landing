import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Lock,
  UserCircle2,
  Phone,
  CheckCircle2,
  Users,
  Loader2,
} from "lucide-react";
import logo from "@/assets/logo.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useWaitlistCount } from "@/hooks/useWaitlistCount";
import { useRegister } from "@/hooks/useRegister";

const Index = () => {
  const { toast } = useToast();
  const { data: totalCount = 0 } = useWaitlistCount();
  const registerMutation = useRegister();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("rather-not-to-say");
  const [registered, setRegistered] = useState(false);
  const [myPosition, setMyPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim()
    ) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }

    registerMutation.mutate(
      { firstName, lastName, email, phone, password, gender },
      {
        onSuccess: (data) => {
          setMyPosition(data.data.waitlistPosition);
          setRegistered(true);
          toast({
            title: "You've registered successfully! 🎉",
            description: `You're #${data.data.waitlistPosition} on the waiting list.`,
          });
        },
        onError: (error: Error) => {
          toast({
            title: "Registration failed",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Soft hero glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />

      {/* Decorative blurred orbs */}
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-primary-glow/10 blur-3xl"
        aria-hidden
      />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-8 pb-0">
        <div className="-mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-sm font-medium text-accent-foreground shadow-sm md:-mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Coming Soon
        </div>
        <a href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="CareerBook logo"
            className="h-40 w-auto md:h-52"
          />
        </a>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto -mt-6 flex max-w-4xl flex-col items-center px-6 pb-24 pt-0 text-center md:-mt-10">
        <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl">
          Your next{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            career chapter
          </span>{" "}
          is loading
        </h1>

        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Join our waiting list and be among the first to experience the future
          of hiring when we launch.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div
            className="inline-flex items-center gap-3 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-glow)] backdrop-blur md:text-base"
            style={{ background: "var(--gradient-hero)" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <Users className="h-4 w-4 text-primary" />
            <span
              className="bg-clip-text text-base font-extrabold tabular-nums text-transparent md:text-lg"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              {totalCount.toLocaleString()}
            </span>
            <span className="text-foreground/80">
              career movers already joined 🚀
            </span>
          </div>
        </div>

        {/* Sign up form */}
        <Card className="mt-12 w-full max-w-4xl border-border/50 shadow-[var(--shadow-soft)]">
          <CardContent className="p-6">
            {registered ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  You're on the list! 🎉
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  You've registered successfully and joined the waiting list.
                  We'll notify you the moment we launch.
                </p>
                {myPosition !== null && (
                  <div className="mx-auto mt-6 inline-flex flex-col items-center gap-1 rounded-2xl border border-primary/20 bg-primary-soft px-8 py-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Your position
                    </span>
                    <span
                      className="bg-clip-text text-4xl font-bold tabular-nums text-transparent"
                      style={{ backgroundImage: "var(--gradient-primary)" }}
                    >
                      #{myPosition.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-bold text-foreground">
                    Create your account
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Join the waitlist and secure your spot
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">First name *</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First name"
                          className="pl-10"
                          required
                          disabled={registerMutation.isPending}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name *</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="mt-1"
                        required
                        disabled={registerMutation.isPending}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="pl-10"
                        required
                        disabled={registerMutation.isPending}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone number *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="pl-10"
                        required
                        disabled={registerMutation.isPending}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter 8-digit password"
                        className="pl-10"
                        required

                        disabled={registerMutation.isPending}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm password *</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter 8-digit password"
                        className="pl-10"
                        required

                        disabled={registerMutation.isPending}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Gender</Label>
                    <Select
                      value={gender}
                      onValueChange={setGender}
                      disabled={registerMutation.isPending}
                    >
                      <SelectTrigger className="w-full mt-1 h-11 rounded-xl border-border/50 hover:border-primary/50 transition-colors">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">
                          <div className="flex items-center gap-2">
                            <UserCircle2 className="w-4 h-4 text-blue-500" />
                            Male
                          </div>
                        </SelectItem>
                        <SelectItem value="female">
                          <div className="flex items-center gap-2">
                            <UserCircle2 className="w-4 h-4 text-pink-500" />
                            Female
                          </div>
                        </SelectItem>
                        <SelectItem value="rather-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-base font-semibold shadow-[var(--shadow-glow)] hover:opacity-90"
                    style={{ background: "var(--gradient-primary)" }}
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="relative z-10 border-t border-border/60 py-6 text-center text-sm text-muted-foreground">
        © 2026 CareerBook. All rights reserved | Developed by{" "}
        <a
          href="https://ilampagency.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline transition-colors"
        >
          iLamp agency
        </a>
      </footer>
    </div>
  );
};

export default Index;
