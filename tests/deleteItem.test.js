// import { describe, expect, test, vi } from 'vitest';
// import { deleteItem } from '../src/api/firebase';

// // Mocking Firebase's deleteDoc function
// vi.mock('../src/api/firebase', () => ({
//   deleteItem: vi.fn(async () => ({ success: true, message: 'Item successfully deleted' })),
// }));

// describe('delete item firebase fn', () => {
//   test('does delete item', async () => { // Making test function async
//     const listPath = 'DSxXJuIKs6W8IZeL6UtNCqDGBXK2/Trader Joes';
//     const item = { id: '1234' }; // Corrected item to be an object, not an array
//     const itemRef = { id: '1234' };

//     const result = await deleteItem(listPath, item); // Wait for the function to complete
//     expect(result.success).toEqual(true); // Check for success property in result

//   });

//   test('does not delete item', async () => { // Making test function async
//     const listPath = 'some-nonexistent-list-path';
//     const item = { id: '1234' }; // Corrected item to be an object, not an array
//     const itemRef = { id: '5678' };

//     const result = await deleteItem(listPath, item); // Wait for the function to complete
//     expect(result.success).toEqual(false); // Check for success property in result
//   });
// });
