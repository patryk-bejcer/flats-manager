export function sortFlatList(a, b, column, order) {
  let x;
  let y;

  switch (column) {
    case "number":
      x = a.post_title.toLowerCase();
      y = b.post_title.toLowerCase();
      break;
    case "price":
      x = parseInt(a.flat_meta_fields["cena-brutto"]);
      y = parseInt(b.flat_meta_fields["cena-brutto"]);
      break;
    case "status":
      x = a.flat_meta_fields["status"].toLowerCase();
      y = b.flat_meta_fields["status"].toLowerCase();
      break;
    case "stockwerk":
      x = a.flat_meta_fields["kondygnacja"].toLowerCase();
      y = b.flat_meta_fields["kondygnacja"].toLowerCase();
      break;
    case "area":
      x = parseInt(a.flat_meta_fields["powierzchnia-uzytkowa"]);
      y = parseInt(b.flat_meta_fields["powierzchnia-uzytkowa"]);
      break;
    case "garden":
      x = a.flat_meta_fields["ogrodekstrych"].toLowerCase();
      y = b.flat_meta_fields["ogrodekstrych"].toLowerCase();
      break;
    case "garden_area":
      x = parseInt(a.flat_meta_fields["powierzchnia-ogrodkastrychu"]);
      y = parseInt(b.flat_meta_fields["powierzchnia-ogrodkastrychu"]);
      break;
    case "post_status":
      x = a.post_status;
      y = b.post_status;
      break;
    default:
      x = a.post_title.toLowerCase();
      y = b.post_title.toLowerCase();
      break;
  }

  if (!order) {
    if (x < y) return 1;
    if (x > y) return -1;
    if (x === '') return -1;
  } else {
    if (x < y) return -1;
    if (x > y) return 1;
    if (x === '') return -1;
  }
  return 0;
}