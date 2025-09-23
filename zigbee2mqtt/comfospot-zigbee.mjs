import {access, presets, numeric} from "zigbee-herdsman-converters/lib/exposes";

const ea = access;
const e = presets;

const fanModeLookup = {
    0: 'off',
    1: 'low',
    2: 'medium',
    3: 'high',
    4: 'auto',
};

const fanModeReverseLookup = {
    'off': 0,
    'low': 1,
    'medium': 2,
    'high': 3,
    'auto': 4,
};

const fzHvacFanControl = {
    cluster: 'hvacFanCtrl',
    type: ['attributeReport', 'readResponse'],
    convert: (model, msg, publish, options, meta) => {
        const result = {};
        if ('fanMode' in msg.data) {
            result.fan_mode = fanModeLookup[msg.data.fanMode] || msg.data.fanMode;
        }
        if ('fanModeSequence' in msg.data) {
            result.fan_mode_sequence = msg.data.fanModeSequence;
        }
        return result;
    },
};

const tzHvacFanControl = {
    key: ['fan_mode'],
    convertSet: async (entity, key, value, meta) => {
        const mode = fanModeReverseLookup[value];
        if (mode === undefined) {
            throw new Error(`Unsupported fan_mode: ${value}`);
        }
        await entity.write('hvacFanCtrl', { fanMode: mode });
        return { state: { fan_mode: value } };
    },
    convertGet: async (entity, key, meta) => {
        await entity.read('hvacFanCtrl', ['fanMode']);
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
        e.enum('fan_mode', ea.ALL, ['off', 'low', 'medium', 'high', 'auto']),
    ],
};


