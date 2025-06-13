// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useState } from "react"

// export function LoginForm({ className, ...props }) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   async function handleSubmit(e) {
//     e.preventDefault()

//     console.log(email);
//     console.log(password);

    
//   }

//   return (
//     <div className={cn("flex flex-col gap-6 bg-black min-h-screen", className)} {...props}>
//       <Card className="bg-zinc-900 border-zinc-800 text-white">
//         <CardHeader>
//           <CardTitle className="text-white">Login to your account</CardTitle>
//           <CardDescription className="text-zinc-400">
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-3">
//                 <Label htmlFor="email" className="text-zinc-300">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="abc@example.com"
//                   required
//                   className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
//                 />
//               </div>
//               <div className="grid gap-3">
//                 <div className="flex items-center">
//                   <Label htmlFor="password" className="text-zinc-300">Password</Label>
//                   <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-zinc-400 hover:text-white"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
//                 />
//               </div>
//               <div className="flex flex-col gap-3">
//                 <Button type="submit" className="w-full cursor-pointer bg-white text-black hover:bg-indigo-50">
//                   Login
//                 </Button>
//                 <Button variant="outline" className="w-full cursor-pointer bg-zinc-800 text-white border-0 hover:bg-zinc-800 hover:text-white">
//                   Login with Google
//                 </Button>
//               </div>
//             </div>
//             <div className="mt-4 text-center text-sm text-zinc-400">
//               Don&apos;t have an account?{" "}
//               <a href="#" className="underline underline-offset-4 text-white">
//                 Sign up
//               </a>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
import { useState } from "react"

export function LoginForm({ className, mode = "login", onSubmit, onToggleMode, ...props }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isLogin = mode === "login"
3
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (onSubmit) {
      const data = isLogin
        ? { email, password }
        : { name, email, password }
      onSubmit(data)
      // console.log(data);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 bg-black min-h-screen", className)} {...props}>
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle className="text-white">
            {isLogin ? "Login to your account" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {isLogin
              ? "Enter your email below to login to your account"
              : "Enter your name, email and password to register"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {!isLogin && (
                <div className="grid gap-3">
                  <Label htmlFor="name" className="text-zinc-300">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                  />
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@example.com"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-zinc-300">Password</Label>
                  {isLogin && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-zinc-400 hover:text-white"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer bg-white text-black hover:bg-indigo-50">
                  {isLogin ? "Login" : "Register"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer bg-zinc-800 text-white border-0 hover:bg-zinc-700"
                >
                  Continue with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-zinc-400 ">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={onToggleMode}
                className="underline underline-offset-4 text-white cursor-pointer"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
