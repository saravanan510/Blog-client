import React from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { grey } from "@mui/material/colors";
import DOMPurify from "dompurify";
import { Link as RouterLink } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

const BlogCard = ({ blog }) => {
  const truncateString = (str, maxLength) => {
    const plainText = DOMPurify.sanitize(str, {
      USE_PROFILES: { html: true },
    }).replace(/<[^>]+>/g, "");
    if (plainText.length > maxLength) {
      return plainText.slice(0, maxLength - 3) + "...";
    }
    return plainText;
  };

  const truncatedContent = truncateString(blog.content, 200);

  return (
    <Container sx={{ borderBottom: "1px solid #EBEBEB" }}>
      <Box sx={{ padding: "12px 0px", margin: "12px 0px" }}>
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 32,
              width: 32,
              borderRadius: "100px",
            }}
            src={`https://blog-server-karj.onrender.com/public/images/${blog.author.profilePicture}`}
          />
          <Typography variant="body1">{blog.author.username}</Typography>
          <Typography variant="body1" sx={{ color: "grey" }}>
            {format(parseISO(blog.createdAt), "do MMM, yyyy")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "48px" }}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                marginBottom: "30px",
                textDecoration: "none",
                color: "inherit",
              }}
              component={RouterLink}
              to={`/post/${blog._id}`}
            >
              {blog.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ margin: "4px 0px 32px", color: "#2B2B2B" }}
            >
              {truncatedContent}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                <ul
                  style={{
                    listStyleType: "none",
                    padding: "0px",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  {blog.tags.map((tag) => {
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
              <Box sx={{ display: "flex", gap: "6px" }}>
                <ModeCommentOutlinedIcon sx={{ color: grey[600] }} />
                <Typography>{blog.comments.length}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "300px" }}>
            <Box
              component="img"
              sx={{
                width: "200px",
                borderRadius: "6px",
              }}
              src={`https://blog-server-karj.onrender.com/public/images/${blog.featuredImage}`}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogCard;
