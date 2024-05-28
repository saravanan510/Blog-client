import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Axios from "../utils/axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { blue, red } from "@mui/material/colors";
import { format, parseISO } from "date-fns";

import { Link as RouterLink } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useAuth } from "../context/AuthContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const SinglePost = () => {
  const [post, setPost] = useState();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [isCommentAdd, setIsCommentAdd] = useState("");
  const [editComment, setEditComment] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = (comment) => {
    setOpen(true);
    setEditComment(comment);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      const post = await Axios.get(`/api/posts/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("single", post);
      setPost(post.data);
    })();
  }, [isCommentAdd]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const commentResponse = await Axios.post(
        `/api/posts/${id}/comments`,
        { content },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("commentResponse", commentResponse);
      setIsCommentAdd(commentResponse.data);
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditComment = async (e) => {
    console.log("editComment", editComment);
    setOpen(false);

    const editCommentResponse = await Axios.put(
      `/api/posts/${id}/comments/${editComment._id}`,
      editComment,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log("editCommentResponse", editCommentResponse);
    setIsCommentAdd(editCommentResponse.data);
  };
  const handleDeleteComment = async (commentId) => {
    alert("are you want to delete");
    const deleteCommentResponse = await Axios.delete(
      `/api/posts/${id}/comments/${commentId}`,

      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log("deleteCommentResponse", deleteCommentResponse);
    setIsCommentAdd(deleteCommentResponse.data);
  };
  const handleEditPost = async () => {
    navigate(`/edit-post/${id}`);
  };
  const handleDeletePost = async () => {
    try {
      const deletePostResponse = await Axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("deletePostResponse", deletePostResponse);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Container maxWidth="md" sx={{ padding: "32px 0" }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "800",
              margin: "32px 0px 24px",
            }}
          >
            {post?.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: "36px",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 48,
                  width: 48,
                  borderRadius: "100px",
                }}
                src={`https://blog-server-karj.onrender.com/public/images/${post?.author?.profilePicture}`}
              />
              <Typography variant="body1">{post?.author.username}</Typography>
              <Typography variant="body1" sx={{ color: "grey" }}>
                {/* {format(parseISO(post?.createdAt), "do MMM, yyyy")} */}
              </Typography>
            </Box>

            {user?.profile?._id == post?.author?._id && (
              <Box sx={{ marginBottom: "20px" }}>
                <Button onClick={handleEditPost} sx={{ color: blue[500] }}>
                  Edit
                </Button>
                <Button onClick={handleDeletePost} sx={{ color: red[500] }}>
                  Delete
                </Button>
              </Box>
            )}
          </Box>

          <Box
            component="img"
            sx={{
              width: "100%",
              marginBottom: "32px",
              borderRadius: "12px",
            }}
            src={`https://blog-server-karj.onrender.com/public/images/${post?.featuredImage}`}
          />

          <Typography
            variant="body1"
            sx={{
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
          </Typography>
          <Typography variant="body2">
            <ul
              style={{
                listStyleType: "none",
                padding: "0px",
                display: "flex",
                gap: "12px",
              }}
            >
              {post?.tags.map((tag) => {
                return (
                  <li
                    style={{
                      backgroundColor: "#EEEEEE",
                      width: "fit-content",
                      padding: "6px 12px",
                      color: "black",
                      borderRadius: "50px",
                    }}
                  >
                    {tag.name}
                  </li>
                );
              })}
            </ul>
          </Typography>
          <Box sx={{ margin: "48px 0px 32px " }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              Comments
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                multiline
                fullWidth
                name="comment"
                label="comment"
                id="comment"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, width: "120px" }}
              >
                post
              </Button>
            </Box>
          </Box>

          {post?.comments.length == 0 ? (
            <p>No comments</p>
          ) : (
            post?.comments.map((comment) => {
              return (
                <Box
                  sx={{
                    borderBottom: "1px solid #EBEBEB",
                    padding: "12px 0px",
                    margin: "12px 0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: 48,
                          width: 48,
                          borderRadius: "100px",
                          marginBottom: "24px",
                        }}
                        src={`https://blog-server-karj.onrender.com/public/images/${comment?.author?.profilePicture}`}
                      />
                      <Box>
                        <Typography variant="body1">
                          {comment?.author.username}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "grey", marginTop: "4px" }}
                        >
                          {/* {comment?.createdAt} */}
                          {format(parseISO(comment?.createdAt), "do MMM, yyyy")}
                        </Typography>
                      </Box>
                    </Box>
                    {user?.profile._id == comment?.author._id && (
                      <Box sx={{ display: "flex", gap: "20px" }}>
                        <EditOutlinedIcon
                          sx={{ color: blue[500] }}
                          onClick={() => {
                            handleOpen(comment);
                          }}
                        />
                        <DeleteOutlinedIcon
                          sx={{ color: red[500] }}
                          onClick={() => {
                            handleDeleteComment(comment._id);
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "12px",
                    }}
                  >
                    {comment?.content}
                  </Typography>
                </Box>
              );
            })
          )}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              sx={{ fontWeight: 600, marginBottom: "12px" }}
              variant="h6"
            >
              Edit Your Comment
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleEditComment}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="comment"
                    name="comment"
                    fullWidth
                    id="comment"
                    label="comment"
                    autoFocus
                    value={editComment.content}
                    onChange={(e) => {
                      setEditComment({
                        ...editComment,
                        content: e.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default SinglePost;
