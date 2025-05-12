import { BackWhiteIcon } from '@/shared/assets/icons'
import { Button } from '../button'
import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { Input } from '../input'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [pageInput, setPageInput] = useState(currentPage.toString())

  if (totalPages <= 1) {
    return null
  }

  const handlePageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setPageInput(value)
      const numValue = parseInt(value, 10)
      if (!isNaN(numValue) && numValue <= totalPages) {
        onPageChange(numValue)
      }
    }
  }

  const handlePageInputBlur = () => {
    if (pageInput === '' || parseInt(pageInput, 10) < 1) {
      setPageInput('1')
      onPageChange(1)
    } else if (parseInt(pageInput, 10) > totalPages) {
      setPageInput(totalPages.toString())
      onPageChange(totalPages)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlur()
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
      setPageInput((currentPage - 1).toString())
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      setPageInput((currentPage + 1).toString())
    }
  }

  const handlePageUp = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      setPageInput((currentPage + 1).toString())
    }
  }

  const handlePageDown = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
      setPageInput((currentPage - 1).toString())
    }
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-1" aria-hidden="true"></div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === 1}
          onClick={handlePrev}
          aria-label="Previous page"
          className={`rounded-full text-white p-0 ${
            currentPage === 1
              ? 'bg-button-gray-2 w-10 h-10'
              : 'bg-button-accent w-[109px] h-10'
          }`}
        >
          <BackWhiteIcon className="h-6 w-6 text-white" />
          {currentPage !== 1 && <span>Prev</span>}
        </Button>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={handleNext}
          aria-label="Next page"
          className={`rounded-full p-0 ${
            currentPage >= totalPages
              ? 'bg-button-gray-2 w-10 h-10'
              : 'bg-button-accent w-[109px] h-10'
          }`}
        >
          {currentPage < totalPages && <span>Next</span>}
          <BackWhiteIcon className="h-6 w-6 rotate-180 text-white" />
        </Button>
      </div>

      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-white">Page</span>
          <div className="flex items-center rounded-full bg-tetriary overflow-hidden h-10 w-[73px]">
            <Input
              type="text"
              value={pageInput}
              onChange={handlePageInputChange}
              onBlur={handlePageInputBlur}
              onKeyDown={handleKeyDown}
              className="w-10 h-8 text-center p-0"
              aria-label="Current page"
            />
            <div className="flex flex-col">
              <Button
                onClick={handlePageUp}
                disabled={currentPage >= totalPages}
                variant="icon"
                className="p-0 w-fit h-fit"
                aria-label="Next page"
              >
                <BackWhiteIcon className="h-4 w-4 rotate-90" />
              </Button>
              <Button
                onClick={handlePageDown}
                disabled={currentPage <= 1}
                variant="icon"
                className="p-0 w-fit h-fit"
                aria-label="Previous page"
              >
                <BackWhiteIcon className="h-4 w-4 rotate-270" />
              </Button>
            </div>
          </div>
          <span className="text-base font-bold text-white bg-screen">
            of {totalPages}
          </span>
        </div>
      </div>
    </div>
  )
}
