const { getAuth, onAuthStateChanged } = require("firebase/auth");
const db = require("../config/firebase");

const getEvents = async (req, res) => {
  try {
    const { uid } = req.body;

    const events = await db
      .collection("events")
      .where("uid", "==", `${uid}`)
      .get();

    if (events.empty) {
      res.status(404).json([]);
    } else {
      const list = events.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(list);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEvent = async (req, res) => {
  const { title, uid, dateEvent, startTimeEvent, endTimeEvent } = req.body;

  const newEvent = {
    title,
    uid,
    dateEvent,
    startTimeEvent,
    endTimeEvent,
  };

  try {
    await db
      .collection("events")
      .doc()
      .set({ ...newEvent, timestamp: Date.now() });
    res.status(200).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEvent = async (req, res) => {
  const { title, uid, dateEvent, startTimeEvent, endTimeEvent, id } = req.body;

  const editEvent = {
    title,
    uid,
    dateEvent,
    startTimeEvent,
    endTimeEvent,
  };

  try {
    await db.collection("events").doc(id).update(editEvent);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.body;

  try {
    await db.collection("events").doc(id).delete();
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
