# Zigbee Comfospot 50
Hardware module to integrate Comfospot 50 ventilation system with ESP32-H2 zigbee enabled controller. Heavily based on https://github.com/lorenzspenger/comfospot-50 but using the ESP32-H2 and Zigbee.

## Hardware 
Contains a Kicad project to produce the hardware module that plugs inbetwen the Comfospot 50 main board and the user interface panel.

> The latest change to the hardware (shortening the PCB for mechanical fit) was not tested in production. I used a previous revision PCB and shortened it with a file. I will probably never produce the latest version.

## ESPHome
Contains the .yaml file to build the firmware using ESPHome. The `partitions_zb.csv` file is required at the time of writing for zigbee support! OTA is not supported by esphome-zigbee so the image must be programmed using a USB to serial (3.3V TTL levels) converter.

## zigbee2mqtt
Contains the external converter than needs to be provided to Zigbee2MQTT to recognize the device and present it to home assistant. It is currently very basic but is working and the fan unit can be controlled by selecting the desired step.

## TODO
Honestly, it works for me as is right now so don't expect any updates soon. Debugging is quite a pain due to the lack of OTA updates and wireless logging. What I could imagine:

- Support the filter change LED
- More advanced control of fan levels as in https://github.com/lorenzspenger/comfospot-50. My implementation is quite primitive.
- Support control of exhaust/circulation modes.


