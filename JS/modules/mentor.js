const joinAsMentor = async (FormData) => {
  try {
    const res = await myFetch(`${baseUrl}/mentor-requests`, 'POST', FormData, access_token);
    const data = await res.json();
    if (data.success) {
      return true;
    } else {
      throw new Error("Faild to join as mentor");
    }
  } catch (error) {
    console.error(error)
  }
}

exports = {
  joinAsMentor,
}