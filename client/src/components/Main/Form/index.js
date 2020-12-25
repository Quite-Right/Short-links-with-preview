import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import VKPreview from "./VKPreview";
import TGPreview from "./TGPreview";
import CopyBtn from "./CopyBtn";

export default function Form() {
  // подключаем хук location для доступа к url браузера
  const location = useLocation();
  // подключаем хук history для перехода по url
  const history = useHistory();
  // используем эффект, в котором пытаемся получить информацию о уже
  // созданной ссылке, если мы находимся на руте содержащем 24 символа
  // после символа /
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaceholderImage, setIsPlaceholderImage] = useState(false);

  useEffect(() => {
    console.log("get-effect");
    if (location.pathname.length === 25) {
      axios
        .get("/api/get-link?id=" + location.pathname.slice(1, 25))
        .then((response) => {
          console.log(response);
          if (response && response.data) {
            // если нашли, то ставим обновляем значения формы
            console.log(response.data);
            formik.setValues({
              ...response.data,
              id: location.pathname.slice(1, 25),
            });
          }
          setIsLoading(false);
        })
        .catch((reason) => {
          // если мы не нашли ссылку уведомляем пользователя об этом и перенаправляем на основной рут
          toast.error("Link you are looking for doesn't exist", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            onClose: () => {
              history.push("/");
            },
          });
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  const formik = useFormik({
    initialValues: {
      linkFrom: "",
      id: "",
      linkTo: "",
      image: "https://mr-sl.com/logo_black.png",
      title: "MR Short Links",
      description: "This link was provided by mr-sl.com",
    },
    onSubmit: (values) => {
      if (location.pathname.length === 25) {
        axios
          .put("/api/update-link", {
            id: formik.values.id,
            linkTo: formik.values.linkTo,
            image: formik.values.image,
            title: formik.values.title,
            description: formik.values.description,
          })
          .then((response) => {
            if (response && response.data) {
              toast.success("Successfully updated", {
                position: "top-right",
                autoClose: 1250,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => {
                  history.push("/" + response.data._id);
                  formik.setSubmitting(false);
                },
              });
            }
          })
          .catch((reason) => {
            toast.error("Something went wrong", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
            formik.setSubmitting(false);
          });
      } else {
        axios
          .post("/api/create-link", {
            linkTo: formik.values.linkTo,
            image: formik.values.image,
            title: formik.values.title,
            description: formik.values.description,
          })
          .then((response) => {
            if (response && response.data && response.data._id) {
              toast.success("Successfully created", {
                position: "top-right",
                autoClose: 1250,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => {
                  history.push("/" + response.data._id);
                  formik.setSubmitting(false);
                },
              });
            }
          })
          .catch((reason) => {
            toast.error("Bad request", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
            formik.setSubmitting(false);
          });
      }
    },
  });
  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      {!isLoading && (
        <>
          <div className="preview-title">VK</div>
          <VKPreview
            image={formik.values.image}
            title={formik.values.title}
            linkTo={formik.values.linkTo}
            isPlaceholderImage={isPlaceholderImage}
            setIsPlaceholderImage={setIsPlaceholderImage}
          />
        </>
      )}
      {!isLoading && (
        <>
          <div className="preview-title">Telegram</div>
          <TGPreview
            image={formik.values.image}
            description={formik.values.description}
            title={formik.values.title}
            linkTo={formik.values.linkTo}
            isPlaceholderImage={isPlaceholderImage}
            setIsPlaceholderImage={setIsPlaceholderImage}
          />
        </>
      )}
      <div className="input-group">
        <label className="label">Your Link</label>
        <input
          className="input"
          type="string"
          name="linkTo"
          onChange={formik.handleChange}
          value={formik.values.linkTo}
        />
        {true && formik.errors.linkTo}
      </div>
      <div className="input-group">
        <label className="label">Image</label>
        <input
          className="input"
          type="string"
          name="image"
          onChange={formik.handleChange}
          value={formik.values.image}
        />
        {true && formik.errors.image}
      </div>

      <div className="input-group">
        <label className="label">Title</label>
        <input
          className="input"
          type="string"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {true && formik.errors.title}
      </div>

      <div
        className="input-group"
        style={{ borderBottom: 0, paddingBottom: 0 }}
      >
        <label className="label">Description</label>
        <input
          className="input"
          type="string"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {true && formik.errors.description}
      </div>
      <div className="link-actions-container">
        {location.pathname.length !== 25 ? (
          ""
        ) : (
          <CopyBtn text={formik.values.linkFrom} />
        )}
        <input
          className="submit-btn"
          type="submit"
          disabled={formik.isSubmitting}
          value={
            location.pathname.length !== 25 ? "Create Link" : "Update Link"
          }
        />
        {location.pathname.length === 25 ? (
          <div className="link-actions-container">
            <a href="/" className="submit-btn">
              Create new Link
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
      {location.pathname.length === 25 ? (
        <>
          <p className="note">
            *To Successfully update your link in Telegram use
            <a className="note-link" href="https://telegram.me/webpagebot">
              {" "}
              https://telegram.me/webpagebot
            </a>
          </p>
          <p className="note">
            **To Successfully update your link in VK use
            <a className="note-link" href="https://vk.com/dev/pages.clearCache">
              {" "}
              https://vk.com/dev/pages.clearCache
            </a>
          </p>
        </>
      ) : (
        ""
      )}
    </form>
  );
}
