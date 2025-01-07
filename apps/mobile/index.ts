import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import "@azure/core-asynciterator-polyfill";
import { RNEventSource } from "rn-eventsource-reborn";
import { ReadableStream, TransformStream } from "web-streams-polyfill";
import EventSource from "react-native-sse";
globalThis.EventSource = globalThis.EventSource || EventSource;

globalThis.ReadableStream = globalThis.ReadableStream || ReadableStream;
globalThis.TransformStream = globalThis.TransformStream || TransformStream;

import "expo-router/entry";
