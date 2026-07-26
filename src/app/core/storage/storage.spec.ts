import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Storage } from './storage';

describe('Storage', () => {
  let service: Storage;

  describe('when running in the browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          Storage,
          {
            provide: PLATFORM_ID,
            useValue: 'browser',
          },
        ],
      });

      service = TestBed.inject(Storage);
      localStorage.clear();
    });

    afterEach(() => {
      localStorage.clear();
      vi.restoreAllMocks();
    });

    it('should return and deserialize the stored value', () => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: 1,
          name: 'Laurentiu',
        }),
      );

      const result = service.get<{ id: number; name: string }>('user');

      expect(result).toEqual({
        id: 1,
        name: 'Laurentiu',
      });
    });

    it('should return null when the key does not exist', () => {
      expect(service.get('missing-key')).toBeNull();
    });

    it('should return null when the stored value is invalid JSON', () => {
      localStorage.setItem('invalid', 'invalid-json');

      expect(service.get('invalid')).toBeNull();
    });



  });

  describe('when running on the server', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          Storage,
          {
            provide: PLATFORM_ID,
            useValue: 'server',
          },
        ],
      });

      service = TestBed.inject(Storage);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should return null without accessing localStorage', () => {
      const getItemSpy = vi.spyOn(localStorage, 'getItem');

      const result = service.get('user');

      expect(result).toBeNull();
      expect(getItemSpy).not.toHaveBeenCalled();
    });

    it('should not store anything in localStorage', () => {
      const setItemSpy = vi.spyOn(localStorage, 'setItem');

      service.set('user', { id: 1 });

      expect(setItemSpy).not.toHaveBeenCalled();
    });

    it('should not remove anything from localStorage', () => {
      const removeItemSpy = vi.spyOn(localStorage, 'removeItem');

      service.remove('user');

      expect(removeItemSpy).not.toHaveBeenCalled();
    });
  });
});
