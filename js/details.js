document.addEventListener("DOMContentLoaded", () => {
  // نقرأ الكتاب المختار فقط
  let book = null;
  try {
    const saved = localStorage.getItem("selectedBook");
    if (saved) book = JSON.parse(saved);
  } catch (_) {}

  
  if (!book || !book.title) {
    const container = document.querySelector(".container") || document.body;
    container.innerHTML = `
      <div class="mt-5 text-center">
        <h2>لا يوجد كتاب محدد للعرض</h2>
        <p class="mt-3"><a class="btn btn-secondary" href="product.html">العودة لقائمة الكتب</a></p>
      </div>
    `;
    return;
  }

  // تعبئة عناصر الصفحة
  const $ = (id) => document.getElementById(id);

  const imgSrc =
    book.img && typeof book.img === "string" && book.img.trim() !== ""
      ? book.img
      : "./img/default-book.jpg";

  $("bookImg").src = imgSrc;
  $("bookImg").alt = book.title || "Book Image";
  $("bookTitle").textContent = book.title || "";
  $("bookAuthor").textContent = book.author || "";
  $("bookPrice").textContent =
    typeof book.price === "number" ? `$${book.price}` : (book.price || "");
  $("bookLanguage").textContent = book.language || "";
  $("bookPublisher").textContent = book.publisher || "";
  $("bookCategory").textContent = book.category || "";
  $("bookSummary").textContent = book.summary || "";
});