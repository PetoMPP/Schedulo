import Input from "@/app/components/input";
import SvgEmail from "@/app/components/svg/email";
import SvgPassword from "@/app/components/svg/password";
import SvgUser from "@/app/components/svg/user";

async function userRegister(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    console.log("creds:", email, username, password);
}

export default function UserRegister() {
    return (
        <>
            <h2 className="font-semibold text-2xl pb-2">Register</h2>
            <form action={userRegister} className="flex flex-col gap-3 lg:max-w-[50%]">
                <Input name="email" svg={<SvgEmail />} placeholder="email" />
                <Input name="username" svg={<SvgUser />} placeholder="username" />
                <Input name="password" svg={<SvgPassword />} type="password" placeholder="password" />
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </>
    );
}