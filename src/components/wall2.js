import { db, auth, getTasks } from "../Firebase/firebase";
import { post, getPost,deletePosta } from "../Firebase/authentication";
import { onNavigate } from "../router.js";
import { collection, query, onSnapshot } from "firebase/firestore";
import { userPosts } from "../store/userData.js";

let buttonSend = document.createElement("btn");
let inputShowModal = document.createElement("textarea");

buttonSend.addEventListener("click", () => {
  const task = document.createElement("p");
  task.textContent = inputShowModal.value;

  const taskContainer = document.querySelector("#taskContainer"); // Obtener el elemento que contenerá las tareas
  if (taskContainer) {
    // Verificar si el elemento existe
    taskContainer.appendChild(task);
    console.log(task);
  } else {
    console.error("No se encontró el elemento que contiene las tareas");
  }
  inputShowModal.value = "";
});
export const wall = () => {
  const div = document.createElement("div");
  const dialog = document.createElement("dialog");
  const buttonxIcon = document.createElement("img", "btn");
  const buttonxIcon2 = document.createElement("img", "btn");
  const dialogAjustes = document.createElement("dialog");
  const buttonDeleteIcon = document.createElement("img", "btn");
  const buttonEditIcon = document.createElement("img", "btn");
  const adjustmentButtons = document.createElement("img");
  const taskContainer = document.createElement("div");
  const imgUser = document.createElement("img");
  const logo2 = document.createElement("img");
  const fondo = document.createElement("img");
  const likeEmptyIcon = document.createElement("img", "input");
  const likeFullIcon = document.createElement("img", "input");
  const commentIcon = document.createElement("img", "input");
  const buttonSingOff = document.createElement("btn");
  const inputComment = document.createElement("input");
  let buttonsShowModal = document.createElement("img", "btn");
  let inputPost = document.createElement("input");
  let buttonSend = document.createElement("btn");
  let inputShowModal = document.createElement("textarea");
  inputShowModal.placeholder = "¿ Qué estás pensando ... ?";
  inputPost.placeholder = "¿ Qué estás pensando ... ?";
  inputPost.type = "texto";
  inputComment.type = "texto";
  adjustmentButtons.type = "btn";
  imgUser.type = "img";
  buttonsShowModal.type = "btn";
  buttonxIcon.type = "btn";
  buttonxIcon2.type = "btn";
  fondo.id = "fondo";
  div.id = "section";
  logo2.id = "logo2";
  dialog.id = "dialog";
  inputShowModal.id = "ShowModal";
  inputPost.id = "post";
  inputComment.id = "comment";
  imgUser.id = "imgUser";
  taskContainer.id = "taskContainer";
  buttonSend.textContent = "SEND";
  /* buttonEditIcon.textContent = "Edit";
   buttonDeleteIcon.textContent = "Delete";*/
  buttonSingOff.textContent = "Cerrar Sesión";
  buttonSend.className = "send";
  buttonxIcon.className = "buttonX";
  buttonxIcon2.className = "buttonX2";
  adjustmentButtons.className = "adjustmentButtonsIcon";
  buttonsShowModal.className = "ButtonsShowModal";
  buttonEditIcon.className = "edit";
  buttonDeleteIcon.className = "delete";

  likeEmptyIcon.className = "likeEmptyIcon";
  likeFullIcon.className = "likeFullIcon";
  commentIcon.className = "iconComment";
  buttonSingOff.className = "buttonSingOff";
  adjustmentButtons.className = "adjustmentButtonsIcon";
  buttonsShowModal.className = "ButtonsShowModal";
  dialogAjustes.className = "dialogAjustes";
  //agregado
  imgUser.src = "./imagenes/user.png";
  imgUser.alt = "imgUser";
  adjustmentButtons.src = "./imagenes/adjustmentButtonsIcon.png";
  adjustmentButtons.alt = "adjustmentButtons";
  logo2.src = "./imagenes/logo.png";
  logo2.alt = "Logo";
  fondo.src = "./imagenes/fondo-cel.png";
  fondo.alt = "Fondo";
  likeEmptyIcon.src = "./imagenes/likeVacio.png";
  likeEmptyIcon.alt = "Like1";
  likeFullIcon.src = "./imagenes/likeLleno.png";
  likeFullIcon.alt = "Like2";
  likeFullIcon.style.display = "none";
  buttonDeleteIcon.src = "./imagenes/buttonDeleteIcon.png";
  buttonDeleteIcon.alt = "Delete";
  buttonEditIcon.src = "./imagenes/buttonEditIcon.png";
  buttonEditIcon.alt = "Edit";
  commentIcon.src = "./imagenes/comentario.png";
  commentIcon.alt = "comentario";
  buttonxIcon.src = "./imagenes/x.png";
  buttonxIcon.alt = "equis";
  buttonxIcon2.src = "./imagenes/x.png";
  buttonxIcon2.alt = "equis";
  adjustmentButtons.addEventListener("click", function () {
    dialogAjustes.showModal();
  });
  inputPost.addEventListener("click", function () {
    dialog.showModal();
  });
  buttonSend.addEventListener("click", () => {
    post(inputShowModal.value).then((response) => {
      return response;
    });
    dialog.close();
  });
  buttonxIcon.addEventListener("click", function () {
    dialog.close();
  });
  buttonxIcon2.addEventListener("click", function () {
    dialogAjustes.close();
  });
  buttonSingOff.addEventListener("click", () => {
    onNavigate("/");
  });
  dialog.appendChild(inputShowModal);
  dialog.appendChild(buttonSend);
  dialog.appendChild(buttonxIcon);
  dialogAjustes.appendChild(buttonsShowModal);
  dialogAjustes.appendChild(buttonEditIcon);
  dialogAjustes.appendChild(buttonDeleteIcon);
  dialogAjustes.appendChild(buttonxIcon2);
  div.append(
    dialog,
    dialogAjustes,
    logo2,
    fondo,
    inputPost,
    adjustmentButtons,
    taskContainer,
    imgUser,
    inputComment,
    buttonSingOff
  );
  getPost((querySnapshot) => {
    taskContainer.innerHTML = "";
    const posts = [];
    querySnapshot.forEach((doc) => {
      const posta = doc.data();
      posts.push(posta.contenido);
      buttonDeleteIcon.setAttribute("data-id", doc.id);
    });
    const prueba = posts.forEach((publicacion) => {
      const padre = document.createElement("div");
      const input = document.createElement("textarea");


      const likeEmptyIconClone = likeEmptyIcon.cloneNode(true);
      const likeFullIconClone = likeFullIcon.cloneNode(true);
      const commentIconClone = commentIcon.cloneNode(true);
      const buttonDeleteIconClone = buttonDeleteIcon.cloneNode(true);
      const buttonEditIconClone = buttonEditIcon.cloneNode(true);

      input.id = "comments";
      input.rows = 1; // Valor inicial
      padre.id = "padre";
      
      const btnDelete = taskContainer.querySelectorAll(".delete")
      btnDelete.forEach(btn => {
        btn.addEventListener('click', ({target:{dataset}}) => {
          deletePosta(dataset.id)
        })
      })

      input.value = publicacion;
      console.log(publicacion);
      let liked = false;
      likeEmptyIconClone.addEventListener("click", () => {
        if (!liked) {
          likeFullIconClone.src = "./imagenes/likeLleno.png";
          likeFullIconClone.style.display = "block";
          likeEmptyIconClone.style.display = "none";
          liked = true;
          console.log("liked");
        } else {
        }
      });
      likeFullIconClone.addEventListener("click", () => {
        if (liked) {
          likeEmptyIconClone.src = "./imagenes/likeVacio.png";
          likeEmptyIconClone.style.display = "block";
          likeFullIconClone.style.display = "none";
          liked = false;
          console.log("no liked");
        } else {
        }
      });
      padre.appendChild(input);
      padre.appendChild(likeEmptyIconClone);
      padre.appendChild(likeFullIconClone);
      padre.appendChild(commentIconClone);
      padre.appendChild(buttonDeleteIconClone);
      padre.appendChild(buttonEditIconClone);
      taskContainer.appendChild(padre);
      input.addEventListener("input", () => { // añadir listener revisarlo al final
        input.style.height = "auto";
        /* input.style.height = `${input.scrollHeight}px`; */
      });
    });
  });



  return div;
};