import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6 bg-black min-h-screen", className)} {...props}>
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle className="text-white">Login to your account</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-zinc-300">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-zinc-400 hover:text-white"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full bg-white text-black hover:bg-indigo-50">
                  Login
                </Button>
                <Button variant="outline" className="w-full bg-zinc-800 text-white border-0 hover:bg-zinc-800 hover:text-white">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-zinc-400">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4 text-white">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
