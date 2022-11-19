# ddu-source-vim

Vim script source for ddu.vim

This source collects items from Vim script functions.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

## Configuration

```vim
" Use neomru.vim as ddu source
" https://github.com/Shougo/neomru.vim
function! NeoMruSource()
  return map(neomru#_gather_file_candidates(), { _, path -> #{
        \   word: path,
        \   kind: 'file',
        \   action: #{
        \      path: path,
        \      isDirectory: isdirectory(path),
        \   },
        \ }})
endfunction

call ddu#start({'sources': [
\   #{ name: 'vim', params: #{ func: 'NeoMruSource' } },
\ ]})
```
