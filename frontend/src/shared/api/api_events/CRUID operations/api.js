export const getEvents = async (uid) => {
  try {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid }),
    });

    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const addEvent = async (newEvent) => {
  try {
    const response = await fetch(`http://localhost:3000/newevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    return response.json();
  } catch (e) {
    throw new Error("Oops! Something went wrong!");
  }
};

export const updateEvent = async (newEvent) => {
  try {
    const response = await fetch(`http://localhost:3000/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    return response.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    return response.json();
  } catch (e) {
    console.log(e.message);
  }
};
