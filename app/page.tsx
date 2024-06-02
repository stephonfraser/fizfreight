import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";


export default function Home() {

  const signInUser = async (formData: FormData) => {
    "use server"

    const rawFormData = {
      emailaddress: formData.get('emailaddress'),
      pwd: formData.get('pwd')
    }

    console.log(rawFormData.emailaddress, ":", rawFormData.pwd)

    const { rows } = await sql`SELECT * FROM users;`;
    console.log(rows);
    let userInfo = rows.find((user) => user.email == rawFormData.emailaddress && user.password == rawFormData.pwd);
    if (!userInfo) {
      return console.log("User not found!");
    }
    redirect('/workspace');
  }
  return (
    <main className="flex justify-center mt-10">
      <div className="login p-10 flex-col justify-items-center bg-white rounded-md">
        <div className="logo flex justify-center">
          <Image src="/fizfreight.png" alt="logo" width={200} height={200} style={{objectFit: "contain"}}	/>
        </div>
        <div className="login-head subheading mt-5 text-[40px]">
          Sign in to your admin account
        </div>
        <div className="login-form-body">
          <form className="flex flex-col justify-center" action={signInUser}>
            <Input type="text" name="emailaddress" id="emailaddress" placeholder="Email Address" className="my-5"/>
            <Input type="password" name="pwd" id="pwd" placeholder="Password"/>
            <Button variant="outline" className="my-5" type="submit">Sign In</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
