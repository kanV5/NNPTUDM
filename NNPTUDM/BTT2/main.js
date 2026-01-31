async function LoadData() {
    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();
    let body = document.getElementById("body_table");
    body.innerHTML = '';

    for (const post of posts) {
        let rowClass = post.isDeleted ? "deleted" : "";
        let btnDelete = post.isDeleted
            ? `<button disabled>Deleted</button>`
            : `<button onclick="Delete(${post.id})">Delete</button>`;

        body.innerHTML += `
        <tr class="${rowClass}">
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.views}</td>
            <td>${btnDelete}</td>
        </tr>`;
    }
}

async function LoadComments() {
    let res = await fetch("http://localhost:3000/comments");
    let comments = await res.json();
    let body = document.getElementById("comment_table");
    body.innerHTML = "";

    for (const cmt of comments) {
        let rowClass = cmt.isDeleted ? "deleted" : "";

        let btnDelete = cmt.isDeleted
            ? `<button disabled>Deleted</button>`
            : `<button onclick="DeleteComment(${cmt.id})">Delete</button>`;

        let btnEdit = cmt.isDeleted
            ? `<button disabled>Edit</button>`
            : `<button onclick="EditComment(${cmt.id})">Edit</button>`;

        body.innerHTML += `
        <tr class="${rowClass}">
            <td>${cmt.id}</td>
            <td>${cmt.text}</td>
            <td>${cmt.postId}</td>
            <td>
                ${btnEdit}
                ${btnDelete}
            </td>
        </tr>`;
    }
}

async function EditComment(id) {
    let res = await fetch("http://localhost:3000/comments/" + id);
    let cmt = await res.json();

    document.getElementById("cmt_id").value = cmt.id;
    document.getElementById("cmt_text").value = cmt.text;
    document.getElementById("cmt_postId").value = cmt.postId;
}

function ClearCommentForm() {
    document.getElementById("cmt_id").value = "";
    document.getElementById("cmt_text").value = "";
    document.getElementById("cmt_postId").value = "";
}



async function Save() {
    let id = document.getElementById("id_txt").value.trim();
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("view_txt").value;

    // 👉 TRƯỜNG HỢP TẠO MỚI (ID RỖNG)
    if (id === "") {
        // Lấy toàn bộ posts để tìm maxId
        let res = await fetch("http://localhost:3000/posts");
        let posts = await res.json();

        let maxId = 0;
        for (const post of posts) {
            let numId = Number(post.id);
            if (numId > maxId) {
                maxId = numId;
            }
        }

        let newId = (maxId + 1).toString();

        await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: newId,                 // ✅ ID là chuỗi
                title: title,
                views: Number(views),
                isDeleted: false
            })
        });

    } 
    // 👉 TRƯỜNG HỢP UPDATE
    else {
        await fetch("http://localhost:3000/posts/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,                    // ✅ giữ nguyên id (chuỗi)
                title: title,
                views: Number(views),
                isDeleted: false
            })
        });
    }

    // Reset form cho tiện dùng
    document.getElementById("id_txt").value = "";
    document.getElementById("title_txt").value = "";
    document.getElementById("view_txt").value = "";

    LoadData();
}

async function SaveComment() {
    let id = document.getElementById("cmt_id").value.trim();
    let text = document.getElementById("cmt_text").value;
    let postId = document.getElementById("cmt_postId").value;

    // CREATE
    if (id === "") {
        let res = await fetch("http://localhost:3000/comments");
        let comments = await res.json();

        let maxId = 0;
        for (const c of comments) {
            let numId = Number(c.id);
            if (numId > maxId) maxId = numId;
        }

        let newId = (maxId + 1).toString();

        await fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: newId,
                text: text,
                postId: postId,
                isDeleted: false
            })
        });
    }
    // UPDATE
    else {
        await fetch("http://localhost:3000/comments/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                text: text,
                postId: postId,
                isDeleted: false
            })
        });
    }

    document.getElementById("cmt_id").value = "";
    document.getElementById("cmt_text").value = "";
    document.getElementById("cmt_postId").value = "";

    LoadComments();
}


async function Delete(id) {
    let getItem = await fetch("http://localhost:3000/posts/" + id);
    let post = await getItem.json();

    let res = await fetch("http://localhost:3000/posts/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...post,
            isDeleted: true
        })
    });

    if (res.ok) {
        console.log("Xoá mềm thành công");
    }

    LoadData();
}

async function DeleteComment(id) {
    let res = await fetch("http://localhost:3000/comments/" + id);
    let cmt = await res.json();

    await fetch("http://localhost:3000/comments/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...cmt,
            isDeleted: true
        })
    });

    LoadComments();
}


LoadData();
LoadComments(); 