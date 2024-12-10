module.exports = {
  run: [
    {
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "python -m pip install --upgrade pip",
          "uv pip install --upgrade setuptools wheel"
        ]
      }
    },
    // windows nvidia
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install -r https://raw.githubusercontent.com/sdbds/TRELLIS-for-windows/refs/heads/main/requirements.txt",
          "uv pip sync https://raw.githubusercontent.com/sdbds/TRELLIS-for-windows/refs/heads/main/requirements-uv.txt --index-strategy unsafe-best-match",
          "uv pip install --no-build-isolation -e extensions/vox2seq/",
          "uv pip install kaolin -f https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.5.1_cu124.html",
          "uv pip install --no-build-isolation git+https://github.com/JeffreyXiang/diffoctreerast.git",
          "uv pip install git+https://github.com/sdbds/diff-gaussian-rasterization"
          
          // These have been commented out for the sake of checking whether syncing from online requirements.txt will resolve issues or not
          // "pip install torch==2.5.1 torchvision==0.20.1 {{args && args.xformers ? 'xformers' : ''}}  --index-url https://download.pytorch.org/whl/cu124",
          // "pip install https://github.com/bdashore3/flash-attention/releases/download/v2.7.1.post1/flash_attn-2.7.1.post1+cu124torch2.5.1cxx11abiFALSE-cp310-cp310-win_amd64.whl",
          // // "pip install flash-attn",
          // "uv pip install kaolin -f https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.5.1_cu124.html",
          // "pip install git+https://github.com/NVlabs/nvdiffrast.git",
          // "pip install git+https://github.com/JeffreyXiang/diffoctreerast.git",
          // "pip install git+https://github.com/autonomousvision/mip-splatting.git#subdirectory=submodules/diff-gaussian-rasterization",
          // "pip install -e extensions/vox2seq/",
          // "pip install spconv-cu120"
        ]
      }
    },
    // linux nvidia
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "pip install torch==2.5.1 torchvision==0.20.1 {{args && args.xformers ? 'xformers' : ''}}  --index-url https://download.pytorch.org/whl/cu124",
          "pip install https://github.com/Dao-AILab/flash-attention/releases/download/v2.7.2.post1/flash_attn-2.7.2.post1+cu12torch2.5cxx11abiFALSE-cp310-cp310-linux_x86_64.whl",
          "pip install kaolin -f https://nvidia-kaolin.s3.us-east-2.amazonaws.com/torch-2.5.1_cu124.html",
          "pip install git+https://github.com/NVlabs/nvdiffrast.git",
          "pip install git+https://github.com/JeffreyXiang/diffoctreerast.git",
          "pip install git+https://github.com/autonomousvision/mip-splatting.git#subdirectory=submodules/diff-gaussian-rasterization",
          "pip install -e extensions/vox2seq/",
          "pip install spconv-cu120"
        ]
      }
    },
    // linux rocm (amd)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "pip install torch==2.4.1 torchvision==0.19.1 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/rocm6.1",
          "pip install https://github.com/ROCm/flash-attention/releases/download/v2.6.3-cktile/flash_attn-2.6.3+cu118torch2.4cxx11abiFALSE-cp310-cp310-linux_x86_64.whl",
          "pip install spconv"
        ]
      }
    }
  ]
}
