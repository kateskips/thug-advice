class AdvicesController < ApplicationController
    def index
    render json: Advice.all
    end

    def new
    advice = Advice.new
    end

    def create
    render json: Advice.new(advice_params)
    if advice.valid?
        advice.save
    else
        render json: new
      end
    end

    def show
    render json: Advice.find(params[:id])
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


