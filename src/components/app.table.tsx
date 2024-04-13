"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import CreateModal from "./create.modal";
import UpdateModal from "./update.modal";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface IProps {
    blogs: IBlog[];
}
function AppTable(props: IProps) {
    const { blogs } = props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [id, setId] = useState<number>(-1);
    const handleUpdate = (id: number) => {
        console.log(blogs[blogs.length - id]);
        setTitle(blogs[blogs.length - id].title);
        setContent(blogs[blogs.length - id].content);
        setAuthor(blogs[blogs.length - id].author);
        setId(blogs[blogs.length - id].id);
        setShowUpdateModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm(`Are you sure to delete the blog with id = ${id}`) == true) {
            try {
                const response = await fetch(
                    `http://localhost:8000/blogs/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({}),
                    }
                );

                const result = await response.json();
                toast.success("Deleted successfully");
                mutate("http://localhost:8000/blogs");
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    return (
        <div>
            <div
                className="mb-3"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <h3>Table Blogs</h3>
                <Button variant="secondary" onClick={() => setShowModal(true)}>
                    Add New
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>
                                <Button>
                                    <Link
                                        href={`/blogs/${item.id}`}
                                        className="nav-link"
                                    >
                                        View
                                    </Link>
                                </Button>
                                <Button
                                    variant="warning"
                                    className="mx-3"
                                    onClick={() => handleUpdate(item.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateModal show={showModal} setShow={setShowModal} />
            <UpdateModal
                show={showUpdateModal}
                setShow={setShowUpdateModal}
                title={title}
                content={content}
                id={id}
                author={author}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setContent={setContent}
            />
        </div>
    );
}

export default AppTable;
