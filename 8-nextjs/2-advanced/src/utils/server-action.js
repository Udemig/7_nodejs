"use server"; // bir server foksiyonu olduğunu tanımlar

// server action
const handleAction = async (formData) => {
  // inputlardaki verilere eriş
  const name = formData.get("email");
  const email = formData.get("password");

  // doğrudan vt methodu çalıştırabilir
  // Mongo.users.create({name,email})

  // api isteği atılaiblir
  // fetch("/users", { name, email });

  console.log(name, email);
};

export default handleAction;
