
import { Section } from "./Section";
import Image from "next/image";
import x_dark from "@/images/logos/x_dark.svg";
import linkedin from "@/images/logos/linkedin.svg";
import github from "@/images/logos/github_dark.svg";

const footerSocials = [
    {
        label: "X (formerly Twitter)",
        icon: x_dark,
        href: "https://x.com/KyTechInc",
    },
    {
        label: "LinkedIn",
        icon: linkedin,
        href: "https://www.linkedin.com/in/kylemccracken",
    },
    {
        label: "GitHub",
        icon: github,
        href: "https://github.com/KyTechInc",
    }
];

export const Footer = () => {
    return (
        <Section>
        <footer className="bg-background py-12">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col items-center justify-between lg:flex-row">
                    <ul className="mt-12 flex gap-6 lg:mt-0 lg:w-full lg:max-w-xs">
                        {footerSocials.map(({ label, icon: Icon, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex rounded-xs text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    <Image src={Icon} alt={label} width={24} height={24} />
                                </a>
                            </li>
                        ))}
                    </ul>

                    

                    <p className="mt-6 text-md text-primary lg:mt-0 lg:w-full lg:max-w-md lg:text-right">© {new Date().getFullYear()} Kyle McCracken. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </Section>
    );
};
