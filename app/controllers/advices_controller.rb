class AdvicesController < ApplicationController
    def index 
      advices = Advice.all
      render json: advices
    end

    def new
      advice = Advice.new
    end

    def create
      advice = Advice.new(advice_params)
      if advice.save  
        render json: {status: 'Success', message: 'Entry Complete'}, status: :ok
      else
        render json: {status: 'Error', message: 'Entry Not Complete'}, status: :unprocessable_entity
      end
    end
    
  
    def show
      advice = Advice.find_by(id: params[:id])
      render json: {id: advice.id, quote: advice.quote, user_id:advice.user.name_type}
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
    

