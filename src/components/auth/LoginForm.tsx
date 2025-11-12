"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Checkbox } from "@/components/ui/checkbox"

import SginUpModal from "./SginUpModal"
import ForgetPasswordModal from "./ForgetPasswordModal"

const formSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
})

export default function LoginForm() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    // ✅ Load saved credentials if "Remember Me" was used
    useEffect(() => {
        const savedUser = localStorage.getItem("rememberedUser")
        if (savedUser) {
            const parsed = JSON.parse(savedUser)
            form.setValue("email", parsed.email || "")
            form.setValue("password", parsed.password || "")
            form.setValue("rememberMe", true)
        }
    }, [form])

    // ✅ Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)

            // Remember or clear saved credentials
            if (values.rememberMe) {
                localStorage.setItem(
                    "rememberedUser",
                    JSON.stringify({
                        email: values.email,
                        password: values.password,
                    })
                )
            } else {
                localStorage.removeItem("rememberedUser")
            }

            // ✅ NextAuth signIn call
            const res = await signIn("credentials", {
                redirect: false,
                email: values.email, // use "username" or "email" depending on backend
                password: values.password,
            })

            if (res?.error) {
                toast.error(res.error)
                return
            }

            toast.success("Login successful!")
            window.location.href = "/" // redirect manually since redirect:false
        } catch (error) {
            console.error("Login failed:", error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-[16px]"
            >
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="border border-[#616161] py-4 focus-visible:border-none"
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">
                                Password
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    className="border border-[#616161] py-4 focus-visible:border-none"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between">
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) =>
                                            field.onChange(checked === true)
                                        }
                                    />
                                </FormControl>
                                <FormLabel className="text-[#616161] font-medium text-[14px]">
                                    Remember me
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <p
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#147575] font-normal text-[16px] underline cursor-pointer"
                    >
                        Forgot password?
                    </p>
                    <ForgetPasswordModal
                        open={isModalOpen}
                        onOpenChange={setIsModalOpen}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#147575] hover:bg-[#147575]/90 w-full"
                >
                    {isLoading ? "Logging in..." : "Submit"}
                </Button>
            </form>

            {/* Sign Up Section */}
            <p className="text-center mt-16">
                Don’t have an account?{" "}
                <span
                    onClick={() => setOpen(true)}
                    className="text-[#147575] font-normal cursor-pointer hover:underline"
                >
                    Sign Up
                </span>
            </p>
            <SginUpModal open={open} onOpenChange={setOpen} />
        </Form>
    )
}
