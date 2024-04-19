interface UnavailableDays {
  [month: string]: {
    [day: number]: string[];
  };
}

const unavailableDays: UnavailableDays = {
  "abril": {
    3: ["9:00"],
    4: ["9:00", "10:00", "11:00", "14:00"],
    10:[],
    11:[],
    30:[],

    // Agregar más días según sea necesario
  },
  "mayo": {
    4: ["9:00", "10:00", "11:00", "14:00"],
    3: ["9:00", "10:00", "11:00", "14:00"],
    5: ["9:00", "13:00", "15:00"],
    10:[],
    11:[],
    30:[],
    31:[],
    // Agregar más días según sea necesario
  },
  // Agregar más meses según sea necesario
};

export default unavailableDays;