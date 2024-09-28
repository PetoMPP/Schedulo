import Input from "@/app/components/input";
import SvgEmail from "@/app/components/svg/email";
import SvgPassword from "@/app/components/svg/password";

export default function OwnerLogin() {
    return (
        <>
            <h2 className="font-semibold text-2xl pb-2">Business owner login</h2>
            <form className="flex flex-col gap-3 lg:max-w-[50%]">
                <Input name="email" svg={<SvgEmail />} placeholder="email" />
                <Input name="password" svg={<SvgPassword />} type="password" placeholder="password" />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    );
}