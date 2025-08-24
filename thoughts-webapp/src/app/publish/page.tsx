"use client";
import { useState } from "react";
import useThoughts from "../requests/api";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography, Paper, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import Loading from "@/components/loading";
import { ThoughtDialog } from "@/components/publishedDialogs";

const validationSchema = Yup.object().shape({
  topic: Yup.string().required("Topic is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string().required("Category is required"),
});

const ThoughtsPage = () => {
  const [loading, setLoading] = useState(false);
  const { addThought } = useThoughts();
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const categories = ["Love", "Sad", "Happy", "Bliss", "Neutral"];

  const formik = useFormik({
    initialValues: {
      topic: "",
      content: "",
      category: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const data = await addThought(values);
        if (data?.uniqueCode) {
          setGeneratedId(data.uniqueCode);
          setOpen(true);
        }
        resetForm();
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Loading open={loading} />
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Paper elevation={0} sx={{ p: 4, width: "100%", backgroundColor: "transparent" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
              Submit a Thought
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Thought Topic"
                name="topic"
                value={formik.values.topic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.topic && Boolean(formik.errors.topic)}
                helperText={formik.touched.topic && formik.errors.topic}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Thought Content"
                name="content"
                multiline
                rows={5}
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                margin="normal"
              />

              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                margin="normal"
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </TextField>

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Paper>
        </Box>
        <ThoughtDialog open={open} onClose={() => setOpen(false)} generatedId={generatedId} />
      </Container>
    </>
  );
};

export default ThoughtsPage;
