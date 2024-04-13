"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
function Facebook() {
    const router = useRouter();

    return (
        <div>
            <h1>Facebook Page</h1>
            <Button variant="primary">Hỏi dân IT</Button>
            <button
                onClick={() => {
                    router.push("/");
                }}
            >
                Go back home
            </button>
        </div>
    );
}

export default Facebook;
