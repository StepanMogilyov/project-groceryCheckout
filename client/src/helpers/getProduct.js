export default async function getProduct(productArticle) {
  const response = await fetch("/check-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productArticle }),
  });
  return response.json();
}
