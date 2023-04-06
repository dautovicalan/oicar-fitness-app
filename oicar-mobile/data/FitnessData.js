import { Picker } from "@react-native-picker/picker";

export const fitnessGoals = Array.of(
  { id: 1, text: "Be More Active" },
  { id: 2, text: "Lose Weight" },
  { id: 3, text: "Stay Toned" },
  { id: 4, text: "Build Muscle" },
  { id: 5, text: "Reduce Stress" }
);

export const workoutsPerWeek = Array.of(
  { id: 2, text: "2 - 3" },
  { id: 3, text: "3 - 4" },
  { id: 4, text: "4 - 5" },
  { id: 5, text: "5+" }
);

export const heightDataItems = (isFeet) => {
  let items = [];
  if (!isFeet) {
    for (let i = 100; i <= 220; i++) {
      items.push(<Picker.Item key={i} label={`${i} cm`} value={i} />);
    }
  } else {
    for (let i = 4; i <= 7; i++) {
      for (let j = 0; j <= 11; j++) {
        items.push(
          <Picker.Item
            key={`${i}-${j}`}
            label={`${i}'${j}"`}
            value={i * 12 + j}
          />
        );
      }
    }
  }
  return items;
};

export const weightDataItems = (isPound) => {
  let items = [];
  if (!isPound) {
    for (let i = 30; i <= 200; i++) {
      items.push(<Picker.Item key={i} label={`${i} KG`} value={i} />);
    }
  } else {
    for (let i = 30; i <= 440; i++) {
      items.push(
        <Picker.Item key={i} label={`${i} LBS`} value={Math.round(i / 2.205)} />
      );
    }
  }
  return items;
};
