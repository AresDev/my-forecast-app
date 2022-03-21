import { assign, createMachine } from "xstate";
import { getGeocode } from "../api";
import { getForecast, Location } from "./../api";

interface AppContext {
  count: number;
  address: string;
  matches: any[];
  office: string;
  loading: boolean;
  results: any[];
  location: Location;
}

interface Result {
  count: number;
  address: string;
}

const forecastMachine = createMachine<AppContext>(
  {
    id: "forecastMachine",
    initial: "idle",
    context: {
      count: 0,
      address: "11490 NW 80TH ST Medley Florida", //4600 Silver Hill Rd C Washington C DC 20233
      matches: [],
      results: [],
      location: { latitud: -76.92744, longitude: 38.845985 },
      loading: false,
      office: ""
    },
    states: {
      idle: {
        on: { BTN_CLICKED: "gettingGeocode" }
      },
      gettingGeocode: {
        invoke: {
          src: "getGeocode",
          onDone: {
            target: "gettingForecast",
            cond: "addressMatches",
            actions: ["setLocation"]
          },
          onError: {
            target: "error",
            actions: ["debugEvent"]
          }
        },
        entry: []
      },
      gettingForecast: {
        invoke: {
          src: "getForecast",
          onDone: {
            target: "idle",
            actions: ["debugEvent", "setForecast"]
          },
          onError: {
            target: "error",
            actions: ["debugEvent"]
          }
        }
      },
      error: {
        on: {
          RETRY: "gettingGeocode"
        },
      }
    }
  },
  {
    guards: {
      addressMatches: (_, event) =>{
        return event.data.addressMatches.length > 0
      }
    },
    services: {
      getGeocode: (context) => {
        return getGeocode(context.address);
      },
      getForecast: (context, event) => {
         const { coordinates } = context.matches[0];
        return getForecast({latitud:coordinates.x, longitude: coordinates.y});
      }
    },
    actions: {
      debugEvent: (context, event) => console.log(event),
      toggleLoading: assign({ loading: (ctx) => !ctx.loading }),
      setAddress: assign({ address: (_, event) => event.address }),
      setLocation: assign((context, event) => {
        console.log(event);
        const { addressMatches } = event.data;
        return {
          matches: addressMatches
        };
      }),
      setForecast: assign((context, event) => {
        const { properties } = event.data;
        return {
          results: properties.periods
        };
      })
    }
  }
);

export default forecastMachine;
