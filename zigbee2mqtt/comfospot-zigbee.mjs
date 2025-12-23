import {access, presets, numeric} from "zigbee-herdsman-converters/lib/exposes";

const fanModeLookup = {
    0: 'fault',
    1: 'off',
    2: 'low',
    3: 'medium',
    4: 'high',
};

const fanModeReverseLookup = {
    'fault': 0,
    'off': 1,
    'low': 2,
    'medium': 3,
    'high': 4,
};

const ea = access;
const e = presets;

const tzHvacFanControl = {
    key: ["fan_mode"],
    convertSet: async (entity, key, value, meta) => {
        const fanMode = fanModeReverseLookup[value]
        await entity.write('hvacFanCtrl', { fanMode });
        return {state: {fan_mode: value.toLowerCase()}};
    },
    convertGet: async (entity, key, meta) => {
        await entity.read('hvacFanCtrl', ['fanMode']);
    },
};

const fzHvacFanControl = {
    cluster: "hvacFanCtrl",
    type: ["attributeReport", "readResponse"],
    convert: (model, msg, publish, options, meta) => {
        const result = {};
        if ('fanMode' in msg.data) {
            result.fan_mode = fanModeLookup[msg.data.fanMode] || msg.data.fanMode;
        }
        return result;
    },
};

export default {
    zigbeeModel: ['comfospot-zigbee'],
    model: 'comfospot-zigbee',
    vendor: 'esphome',
    description: 'Automatically generated definition',
    fromZigbee: [fzHvacFanControl],
    toZigbee: [tzHvacFanControl],
    exposes: [
//        e.fan()
//            .withModes(['off', 'low', 'medium', 'high'])
//            .withDescription('Fan control'),
          e.enum('fan_mode', ea.STATE_SET, ['off', 'low', 'medium', 'high'])
              .withDescription('Fan mode'),
    ],
};
