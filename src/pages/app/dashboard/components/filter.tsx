/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { CheckboxInput } from '~/components/form/checkbox-input'
import { COLORS } from '~/constants'

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoriesValue = useMemo(() => {
    return searchParams.get('categories')?.split(',') || []
  }, [searchParams])

  const colorsValue = useMemo(() => {
    return searchParams.get('colors')?.split(',') || []
  }, [searchParams])

  const handleSetCategories = useCallback(
    (key: string) => {
      const currentCategories = categoriesValue

      const newCategories = currentCategories.includes(key)
        ? currentCategories.filter((category) => category !== key)
        : [...currentCategories, key]

      setSearchParams((state) => {
        state.set('categories', newCategories.join(','))

        return state
      })
    },
    [categoriesValue, setSearchParams],
  )

  const handleSetColors = useCallback(
    (key: string) => {
      const currentColors = colorsValue

      const newColors = currentColors.includes(key)
        ? currentColors.filter((category) => category !== key)
        : [...currentColors, key]

      setSearchParams((state) => {
        state.set('colors', newColors.join(','))

        return state
      })
    },
    [colorsValue, setSearchParams],
  )

  const handleClearFilters = useCallback(() => {
    setSearchParams((state) => {
      state.delete('search')
      state.delete('categories')
      state.delete('colors')

      return state
    })
  }, [setSearchParams])

  const isChecked = (key: string) => {
    const currentCategories = categoriesValue
    return currentCategories.includes(key)
  }

  const isSelected = (key: string) => {
    const currentColors = colorsValue
    return currentColors.includes(key)
  }

  return (
    <aside className="d-none d-xl-flex flex-xl-column flex gap-4">
      <div className="d-flex align-items-center gap-4">
        <span className="fs-5 fw-medium">Filters</span>{' '}
        <button
          className="btn btn-light border-0 text-decoration-underline"
          type="button"
          onClick={handleClearFilters}
        >
          Clear filter
        </button>
      </div>
      <div className="flex gap-2">
        <span className="fs-6 fw-medium">Categories</span>
        <CheckboxInput
          id="jackets"
          label="Jackets"
          checked={isChecked('jackets')}
          onChange={() => handleSetCategories('jackets')}
        />
        <CheckboxInput
          id="fleece"
          label="Fleece"
          checked={isChecked('fleece')}
          onChange={() => handleSetCategories('fleece')}
        />
        <CheckboxInput
          id="sweatshirts"
          label="Sweatshirts & Hoodies"
          checked={isChecked('sweatshirts')}
          onChange={() => handleSetCategories('sweatshirts')}
        />
        <CheckboxInput
          id="sweaters"
          label="Sweaters"
          checked={isChecked('sweaters')}
          onChange={() => handleSetCategories('sweaters')}
        />
        <CheckboxInput
          id="shirts"
          label="Shirts"
          checked={isChecked('shirts')}
          onChange={() => handleSetCategories('shirts')}
        />
        <CheckboxInput
          id="tshirts"
          label="T-shirts"
          checked={isChecked('tshirts')}
          onChange={() => handleSetCategories('tshirts')}
        />
        <CheckboxInput
          id="pants"
          label="Pants & Jeans"
          checked={isChecked('pants')}
          onChange={() => handleSetCategories('pants')}
        />
      </div>
      <div className="container flex gap-2">
        <span className="fs-6 fw-medium">Colors</span>
        <div className="row row-cols-4 gap-2">
          {Object.entries(COLORS).map(([colorName, colorValue]) => (
            <button
              type="button"
              className={`col border rounded-circle ${isSelected(colorValue) ? 'border-success' : 'border-dark'}`}
              title={colorName}
              key={colorName}
              onClick={() => handleSetColors(colorValue)}
              style={{
                backgroundColor: colorValue,
                width: 32,
                height: 32,
                borderWidth: isSelected(colorValue) ? 2 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
