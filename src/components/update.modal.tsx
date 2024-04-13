"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface IProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    id: number;
    content: string;
    author: string;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    setAuthor: Dispatch<SetStateAction<string>>;
    setContent: Dispatch<SetStateAction<string>>;
}
function UpdateModal(props: IProps) {
    const {
        show,
        setShow,
        id,
        content,
        author,
        title,
        setTitle,
        setAuthor,
        setContent,
    } = props;

    const handleSubmit = async () => {
        if (!title || !author || !content) {
            toast.error("Not empty input");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8000/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, author, content }),
            });

            const result = await response.json();
            toast.success("Updated successfully");
            mutate("http://localhost:8000/blogs");
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;
