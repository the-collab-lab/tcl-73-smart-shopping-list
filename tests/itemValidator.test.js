import { describe, expect, test } from 'vitest';
import {
	isInputEmpty,
	removePunctuation,
	removeAndSymbolAndWord,
	isItemDuplicate,
} from '../src/utils/itemValidator';

describe('isInputEmpty validator fn', () => {
	test('empty string', () => {
		expect(isInputEmpty('')).toEqual(true);
	});

	test('just spaces', () => {
		expect(isInputEmpty(' ')).toEqual(true);
	});

	test('valid input', () => {
		expect(isInputEmpty('pizza')).toEqual(false);
	});
});

describe('removePunctuation validator fn', () => {
	test('remove symbols: .,?!@#$%^&*', () => {
		expect(removePunctuation('ca.,?!@#$%^*t')).toEqual('cat');
	});

	test('alters input to a all lowercase', () => {
		expect(removePunctuation('CAT')).toEqual('cat');
	});

	test('space removed from word', () => {
		expect(removePunctuation('wat ermelon')).toEqual('watermelon');
	});
});

describe('removeAndSymbolAndWord validator fn', () => {
	test('remove and word', () => {
		expect(removeAndSymbolAndWord('half and half')).toEqual('halfhalf');
	});

	test('remove & symbol', () => {
		expect(removeAndSymbolAndWord('half & half')).toEqual('halfhalf');
	});

	test('word without and or & is returned as is', () => {
		expect(removeAndSymbolAndWord('bread')).toEqual('bread');
	});
});

describe('isItemDuplicate validator fn', () => {
	//tests for inputs using 'and' and '&'
	test('is duplicate: direct match for and word', () => {
		const newItem = 'half and half';
		const itemsList = [{ name: 'half and half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is duplicate: direct match for &', () => {
		const newItem = 'half & half';
		const itemsList = [{ name: 'half & half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is duplicate: and matching &', () => {
		const newItem = 'half & half';
		const itemsList = [{ name: 'half and half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is duplicate: space in new item', () => {
		const newItem = 'h alf & half';
		const itemsList = [{ name: 'half and half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is duplicate: space in old item', () => {
		const newItem = 'half & half';
		const itemsList = [{ name: 'ha lf and half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is duplicate: caps in new item', () => {
		const newItem = 'HALF & HALF';
		const itemsList = [{ name: 'half and half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is duplicate: caps in old item', () => {
		const newItem = 'half and half';
		const itemsList = [{ name: 'HALF & HALF' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is duplicate: symbol in new item', () => {
		const newItem = 'HA%LF & HALF';
		const itemsList = [{ name: 'half and half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is duplicate: symbol in old item', () => {
		const newItem = 'half and half';
		const itemsList = [{ name: 'ha^^lf and half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('is not duplicate', () => {
		const newItem = 'cookies and cream';
		const itemsList = [{ name: 'half and half' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(false);
	});

	//test for singular item entries
	test('single word with space in new item', () => {
		const newItem = 'ap ple';
		const itemsList = [{ name: 'apple' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('single word with space in old item', () => {
		const newItem = 'apple';
		const itemsList = [{ name: 'appl e' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('single word all lowercase in new item, caps in old item', () => {
		const newItem = 'apple';
		const itemsList = [{ name: 'APPLE' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('single word all lowercase in old item, caps in new item', () => {
		const newItem = 'APPLE';
		const itemsList = [{ name: 'apple' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('single word with symbol in new item', () => {
		const newItem = 'a!@p#$p%^&*l,.e';
		const itemsList = [{ name: 'apple' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});

	test('single word with symbol in old item', () => {
		const newItem = 'apple';
		const itemsList = [{ name: 'a!@p#$p%^&*l,.e' }];

		const result = isItemDuplicate(newItem, itemsList);

		expect(result).toEqual(true);
	});
});
