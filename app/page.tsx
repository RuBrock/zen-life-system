import PasskeyModal from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';
  
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && (
        <PasskeyModal />
      )}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src="/assets/images/zen-life-logo-full.jpg"
            height={1000}
            width={1000}
            alt="zen life logo"
            className="mb-12 h-14 w-fit rounded-md"
          />

          <section className="mb-12 space-y-4">
            <h1 className="header">Olá 👋</h1>
            <p className="text-dark-500">Acesse o sistema Zen Life.</p>
          </section>

          <Button className="shad-primary-btn" asChild>
            <Link href="/?admin=true">Entrar</Link>
          </Button>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; {new Date().getFullYear()}{" "} Zen Life
            </p>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/onboarding-img.jpeg"
        height={1000}
        width={1000}
        alt="patient receiveing massage"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
