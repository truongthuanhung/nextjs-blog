"use client";
import { Card } from "react-bootstrap";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";
function DetailBlog(props: any) {
    const fetcher: Fetcher<IBlog, string> = (url: string) =>
        fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blogs/${props.params.slug}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Link href="/blogs" className="nav-links">
                Go back &gt;
            </Link>
            <Card className="mt-3" style={{ textAlign: "center" }}>
                <Card.Header>{data?.title ?? ""}</Card.Header>
                <Card.Body>
                    <Card.Text>{data?.content ?? ""}</Card.Text>
                    <Card.Text>{data?.author ?? ""}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DetailBlog;
