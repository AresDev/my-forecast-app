import { Period } from './../ui/ForecastDetail';
import { assign, createMachine } from "xstate";
import { Coordinates, getGeocode } from "../api";
import { getForecast } from "./../api";

interface AppContext {
  count: number;
  address: string;
  matches: any[];
  office: string;
  loading: boolean;
  results: Period[];
  location: Coordinates;
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
      location: { x: 0, y:0 },
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
        return getForecast({x:coordinates.x, y: coordinates.y});
      }
    },
    actions: {
      debugEvent: (context, event) => console.log(event),
      toggleLoading: assign({ loading: (ctx) => !ctx.loading }),
      setAddress: assign({ address: (_, event) => event.address }),
      setLocation: assign((context, event) => {
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
