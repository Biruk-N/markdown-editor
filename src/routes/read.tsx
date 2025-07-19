import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { Upload, Download } from 'lucide-react'
import MarkdownPreview from '../components/MarkdownPreview'

export const Route = createFileRoute('/read')({
  component: ReadPage,
})

function ReadPage() {
  const [markdown, setMarkdown] = useState('')
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === 'text/markdown' || file.name.endsWith('.md'))) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setMarkdown(content)
      }
      reader.readAsText(file)
    } else {
      alert('Please select a valid markdown file (.md)')
    }
  }

  const handleDownload = () => {
    if (!markdown) return
    
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName || 'document.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800 border-b border-gray-700 gap-4">
            <h2 className="text-lg font-semibold text-white">Read Markdown File</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleUploadClick}
                className="px-4 py-2 text-sm font-medium bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload .md File
              </button>
              {markdown && (
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              )}
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,text/markdown"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {!markdown ? (
            <div className="p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No file selected
              </h3>
              <p className="text-gray-400 mb-4">
                Upload a markdown file to preview its contents
              </p>
              <button
                onClick={handleUploadClick}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Choose File
              </button>
            </div>
          ) : (
            <div className="p-6">
              {fileName && (
                <div className="mb-4 p-3 bg-blue-900 border border-blue-700 rounded-md">
                  <p className="text-sm text-blue-200">
                    <strong>File:</strong> {fileName}
                  </p>
                </div>
              )}
              <div className="prose max-w-none">
                <MarkdownPreview markdown={markdown} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 