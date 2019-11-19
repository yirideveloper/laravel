<?php

namespace Chatter\Core;

use Chatter\Core\Models\Models;
use Illuminate\Support\ServiceProvider;

class ChatterServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__.'/Lang', 'chatter');
        $this->publishes([
            __DIR__.'/../public/assets' => public_path('vendor/chatter/assets'),
        ], 'chatter_assets');

        $this->publishes([
            __DIR__.'/../config/chatter.php' => config_path('chatter.php'),
        ], 'chatter_config');

        $this->publishes([
            __DIR__.'/../database/migrations/' => database_path('migrations'),
        ], 'chatter_migrations');

        $this->publishes([
            __DIR__.'/../database/seeds/' => database_path('seeds'),
        ], 'chatter_seeds');

        $this->publishes([
            __DIR__.'/Lang' => resource_path('lang/vendor/chatter'),
        ], 'chatter_lang');

        // include the routes file
        include __DIR__.'/Routes/web.php';

        view()->composer(['chatter::blocks.sidebar', 'chatter::discussion', 'chatter::home'], function ($view) {
            $view->with('categories', Models::category()->orderBy('order')->get());
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        /*
         * Register the service provider for the dependency.
         */
        $this->app->register(\Mews\Purifier\PurifierServiceProvider::class);

        /*
         * Create aliases for the dependency.
         */
        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias('Purifier', 'Mews\Purifier\Facades\Purifier');

        $viewsDir = __DIR__.'/Views';
        $this->loadViewsFrom($viewsDir, 'chatter');
        $this->publishes([
           $viewsDir => resource_path('views/vendor/chatter'),
        ]);
    }
}
