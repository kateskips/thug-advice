class AdvicesController < ApplicationController
    def index 
      advices = Advice.all
      render json: advices
    end

    def new
      advice = Advice.new
    end

    #def create 
    #  advice = Advice.create(advice_params)
    #  if advice.valid?
    #    advice.save
    #    render json: { "succeeded": true }
    #  else
    #    render json: { "succeeded": false }
    #  end
    #end

    def create
      advice = Advice.new(advice_params)
      if advice.save  
        render json: { status: 'SUCCESS'}, status: :ok
      else
        render json: { status: 'ERROR'}, status: :unprocessable_entity
      end
    end
    
  
    def show
      advice = Advice.find_by(id: params[:id])
      render json: {id: advice.id, quote: advice.quote }
    end

    def update
      render json: advice.update(advice_params)
    end

    def destroy
      render json: advice.destroy
    end

   private

  
   def advice_params
      params.require(:advice).permit(:quote, :user_id)
    end

  end
    

