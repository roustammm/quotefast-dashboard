#!/bin/bash

# AI Collaboration Setup Script for QuoteFast Dashboard
echo "🤖 Starting AI Collaboration Environment..."

# Check if LM Studio is running
check_lm_studio() {
    if curl -s http://localhost:1234/v1/models > /dev/null 2>&1; then
        echo "✅ LM Studio is running on localhost:1234"
        return 0
    else
        echo "❌ LM Studio is not running"
        return 1
    fi
}

# Start LM Studio models
start_models() {
    echo "🚀 Starting AI models..."
    
    # Check if models are loaded
    echo "📋 Available models:"
    curl -s http://localhost:1234/v1/models | jq '.data[] | {id: .id, object: .object}' 2>/dev/null || echo "No models loaded or jq not installed"
    
    echo ""
    echo "💡 To load models in LM Studio:"
    echo "1. Open LM Studio"
    echo "2. Load 'deepseek-coder-33b-instruct' model"
    echo "3. Load 'qwen/qwen3-4b-thinking-2507' model"
    echo "4. Start the local server on port 1234"
}

# Test model collaboration
test_collaboration() {
    echo "🧪 Testing AI collaboration..."
    
    # Test deepseek-coder
    echo "Testing deepseek-coder-33b-instruct..."
    curl -s -X POST http://localhost:1234/v1/chat/completions \
        -H "Content-Type: application/json" \
        -d '{
            "model": "deepseek-coder-33b-instruct",
            "messages": [{"role": "user", "content": "Hello, can you help with coding?"}],
            "max_tokens": 100
        }' | jq '.choices[0].message.content' 2>/dev/null || echo "Model not available"
    
    echo ""
    
    # Test qwen thinking
    echo "Testing qwen/qwen3-4b-thinking-2507..."
    curl -s -X POST http://localhost:1234/v1/chat/completions \
        -H "Content-Type: application/json" \
        -d '{
            "model": "qwen/qwen3-4b-thinking-2507", 
            "messages": [{"role": "user", "content": "Let me think about this problem step by step..."}],
            "max_tokens": 100
        }' | jq '.choices[0].message.content' 2>/dev/null || echo "Model not available"
}

# Main execution
main() {
    echo "🎯 AI Collaboration Setup for QuoteFast Dashboard"
    echo "================================================"
    echo ""
    
    if check_lm_studio; then
        start_models
        echo ""
        test_collaboration
    else
        echo "📝 Setup Instructions:"
        echo "1. Install LM Studio from https://lmstudio.ai"
        echo "2. Download the following models:"
        echo "   - deepseek-coder-33b-instruct"
        echo "   - qwen/qwen3-4b-thinking-2507"
        echo "3. Start LM Studio server on port 1234"
        echo "4. Run this script again"
        echo ""
        echo "🔗 Model Download Links:"
        echo "- deepseek-coder-33b-instruct: https://huggingface.co/deepseek-ai/deepseek-coder-33b-instruct"
        echo "- qwen3-4b-thinking-2507: https://huggingface.co/Qwen/Qwen2.5-7B-Instruct"
    fi
    
    echo ""
    echo "🎉 AI Collaboration Features:"
    echo "- Collaborative coding with multiple AI models"
    echo "- Step-by-step problem solving"
    echo "- Advanced debugging capabilities"
    echo "- Creative ideation and brainstorming"
    echo "- Architecture review and optimization"
    echo ""
    echo "📚 Usage:"
    echo "- Use Cursor with the configured AI models"
    echo "- Models will automatically switch based on task type"
    echo "- Collaborative sessions for complex problems"
    echo "- Integrated with QuoteFast Dashboard development"
}

# Run main function
main
