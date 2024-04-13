import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home Page",
    description: "Home Page of my blog website",
};
export default function Home() {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/facebook" className="nav-link">
                        Facebook
                    </Link>
                </li>
                <li>
                    <Link href="/youtube" className="nav-link">
                        Youtube
                    </Link>
                </li>
                <li>
                    <Link href="/tiktok" className="nav-link">
                        TikTok
                    </Link>
                </li>
            </ul>
        </div>
    );
}
